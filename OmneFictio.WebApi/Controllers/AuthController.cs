using OmneFictio.WebApi.Entities;
using OmneFictio.WebApi.Dtos;
using OmneFictio.WebApi.Models;
using OmneFictio.WebApi.Configurations;
//basic
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
//tools
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;
using BC = BCrypt.Net.BCrypt;
using Google.Apis.Auth;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using OmneFictio.WebApi.Infrastructure;

namespace OmneFictio.WebApi.Controllers;

[ApiController]
[Route("Auth")]
public class AuthController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IHelperServices _helperServices;
    private readonly IMapper _mapper;
    private readonly ILogger<ReadingController> _logger;
    private readonly IConfiguration _configuration;
    JwtSecurityTokenHandler _jwtHandler = new JwtSecurityTokenHandler();

    public AuthController(ILogger<ReadingController> logger, IMapper mapper, OmneFictioContext db, IHelperServices helperServices, IConfiguration iConfig)
    {
        _logger = logger;
        _mapper = mapper;
        if (_mapper == null)
        {
            throw new InvalidOperationException("Mapper not found");
        }
        _db = db;
        _helperServices = helperServices;
        _configuration = iConfig;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] AccountDtoRead_2 request)
    {
        var securityToken = Encoding.ASCII.GetBytes(_configuration.GetSection("Token").Value!);
        //Authentication
        var checkUser = await _db.Accounts.SingleOrDefaultAsync(x => x.username == request.username);
        if (checkUser == null || !BC.Verify(request.pw, checkUser.pw))
        {
            return NotFound();
        }
        //Login
        var createToken = _helperServices.CreateUserToken(checkUser, securityToken);
        if (createToken == null)
        {
            return NotFound();
        }
        return Ok(new { jwt = createToken });
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] AccountDtoWrite_1 request)
    {
        var securityToken = Encoding.ASCII.GetBytes(_configuration.GetSection("Token").Value!);
        //Input validation
        Regex usernameRegex = new Regex(@"[A-Za-z0-9_]{3,30}");
        if (!usernameRegex.IsMatch(request.username) ||
            request.pw!.Contains(" ") ||
            request.pw!.Length < 6)
        {
            return BadRequest();
        }
        if (await _db.Accounts.AnyAsync(a => a.username == request.username))
        {
            return Conflict();
        }
        //Fill an account object
        string passwordHash = BC.HashPassword(request.pw);
        Account newAccount = new Account();
        newAccount.username = request.username;
        newAccount.pw = passwordHash;
        newAccount.email = request.email;
        newAccount.externalType = "native";
        newAccount.emailValid = false;
        newAccount.profilePic = "user_no_photo.png";

        Preference preferences = new Preference();
        preferences.allowAdultContent = bool.TryParse(request.allowAdultContent?.ToString(), out bool allowAdultContent)
            ? allowAdultContent
            : false;
        if (int.TryParse(request.prefLanguageId?.ToString(), out int prefLanguageId)
            && prefLanguageId != 0
            && await _db.Languages.AnyAsync(l => l.id == prefLanguageId))
        {
            preferences.prefLanguageId = prefLanguageId;
        }
        preferences.emailVisibility = false;
        preferences.accountCardMode = 1;
        preferences.postsMasonryDesign = true;
        
        //create account
        await _db.Accounts.AddAsync(newAccount);
        await _db.SaveChangesAsync();
        //create preferences
        preferences.accountId = newAccount.id;
        await _db.Preferences.AddAsync(preferences);
        await _db.SaveChangesAsync();
            
        //Login
        var createToken = _helperServices.CreateUserToken(newAccount, securityToken);
        if (createToken == null)
        {
            return Accepted();
        }
        return Ok(new { jwt = createToken });
    }

    [HttpPost("Signin-External")]
    public async Task<IActionResult> Signin_External([FromBody] string token)
    {
        //validating token
        var validationSettings = new ValidationSettings
        {
            Audience = new string[]
                {"589655350334-bdk3rgelbo3i4otkj08f2hvc69g1lql4.apps.googleusercontent.com"},
            IssuedAtClockTolerance = TimeSpan.FromSeconds(100),
            ExpirationTimeClockTolerance = TimeSpan.FromSeconds(100)
        };
        try
        {
            /*JsonWebSignature.Payload payload = */
            await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);
        }
        catch (InvalidJwtException) { return BadRequest(); }

        //Validation succeeded
        var jwt = _jwtHandler.ReadJwtToken(token);
        string? profilePic = jwt.Claims.FirstOrDefault(claim => claim.Type == "picture")?.Value;
        var extId = jwt.Claims.First(claim => claim.Type == "sub").Value; //External Id

        /*NOTE: to use other services similar to google's, 
            we can use query string to find out where the token comes from*/
        //Creates an account if there is no one with this ID from google
        //If there is one already, it skips to login
        if (_db.Accounts.Any(a => a.externalId == extId && a.externalType == "google") == false)
        {
            Random random = new Random();
            var email = jwt.Claims.First(claim => claim.Type == "email").Value;
            var name = Regex.Replace(jwt.Claims.First(claim => claim.Type == "name").Value, @"\s+", "");
            var username = name;
            for (int i = 0; i < 10; i++)
            {
                if (await _db.Accounts.AnyAsync(a => a.username == username))
                {
                    username = name + random.Next(100, 1000).ToString();
                }
                else { break; }
            }
            if (await _db.Accounts.AnyAsync(a => a.username == username)){
                //Might give them an option to choose a username
                return StatusCode(500);
            }
            string passwordHash = BC.HashPassword(_helperServices.GeneratePassword(16, 8));

            Account newAccount = new Account();
            newAccount.username = username;
            newAccount.email = email;
            newAccount.externalId = extId;
            newAccount.pw = passwordHash;
            newAccount.externalType = "google";
            newAccount.emailValid = true;

            Preference preferences = new Preference();
            preferences.allowAdultContent = false;
            preferences.emailVisibility = false;
            preferences.accountCardMode = 1;
            preferences.postsMasonryDesign = true;
            
            //create account
            await _db.Accounts.AddAsync(newAccount);
            await _db.SaveChangesAsync();
            newAccount.profilePic = "user" + newAccount.id.ToString() + ".png";
            await _db.SaveChangesAsync();
            //create preferences
            preferences.accountId = newAccount.id;
            await _db.Preferences.AddAsync(preferences);
            await _db.SaveChangesAsync();
        }

        //Gets the user for authorization
        var user = await _db.Accounts.SingleOrDefaultAsync(a => a.externalId == extId && a.externalType == "google");
        if (user == null)
        {
            return StatusCode(500);
        }

        var securityToken = Encoding.ASCII.GetBytes(_configuration.GetSection("Token").Value!);
        var createToken = _helperServices.CreateUserToken(user, securityToken);
        if (createToken == null)
        {
            return StatusCode(500);
        }
        return Ok(new { jwt = createToken, pic = profilePic});
    }
}
