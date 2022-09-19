using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace OmneFictio.Web.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    JwtSecurityTokenHandler _jwtHandler = new JwtSecurityTokenHandler();

    public AuthController(ILogger<HomeController> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    //fetch api manual login
    [HttpPost]
    public async Task<ActionResult> UserLogin([FromBody] AccountRead2 account)
    {
        if(account == null)
            return NotFound();
        bool rememberme;
        bool.TryParse(account.RememberMe, out rememberme);
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "NotFound")
            return NotFound();
        else{
            string newToken = await getJwtFromResponse(apiResponse);
            if(newToken != null){
                CreateUserSession(newToken, rememberme: rememberme);
                return Ok();
            }
            else
                return StatusCode(580);
        }
    }

    [HttpPost]
    public async Task<IActionResult> UserRegistration([FromBody] AccountWrite1 account)
    {
        int prefLan;
        bool _AllowAdultContent;
        int.TryParse(account.PrefLanguageId.ToString(), out prefLan);
        bool.TryParse(account.AllowAdultContent.ToString(), out _AllowAdultContent);
        AccountWrite1 createAccount = new AccountWrite1{
            Username = account.Username,
            Email = account.Email,
            Pw = account.Pw,
            PrefLanguageId = prefLan,
            AllowAdultContent = _AllowAdultContent
        };

        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", createAccount);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "OK"){
            string newToken = await getJwtFromResponse(apiResponse);
            if(newToken != null)
                CreateUserSession(newToken);
            return Ok();
        }
        else if(statusCode == "480"){
            //Username is bad
            return StatusCode(480);
        }
        else if(statusCode == "481"){
            //Username duplicate
            return StatusCode(481);
        }
        else if(statusCode == "482"){
            //Password is bad
            return StatusCode(482);
        }
        else if(statusCode == "483"){
            //Failed to save the data in database
            return StatusCode(483);
        }
        else{
            return StatusCode(580);
        }
    }

    [HttpPost]
    public async Task<JsonResult> GoogleSignin(string googleToken)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/signin-external", googleToken);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "OK"){
            string newToken = await getJwtFromResponse(apiResponse);
            if(newToken != null){
                CreateUserSession(newToken);
                return new JsonResult(Ok());
            }
            else
                return new JsonResult(StatusCode(582));
        }
        else if(statusCode == "480"){
            //Token is malicious
            return new JsonResult(StatusCode(480));
        }
        else if(statusCode == "580"){
            //Data couldn't be saved in database
            return new JsonResult(StatusCode(580));
        }
        else if(statusCode == "581"){
            //Couldn't find the user
            return new JsonResult(StatusCode(581));
        }
        else{
            //Api request utterly failed
            return new JsonResult(StatusCode(582));
        }
    }
    
    [HttpGet]
    public IActionResult LogOut(){
        //HttpContext.Session.Clear();
        HttpContext.SignOutAsync();
        HttpContext.Response.Cookies.Delete("UserAuth");
        return RedirectToAction("Index", "Home");
    }





    
    public async Task<string> getJwtFromResponse(HttpResponseMessage response){
        string raw = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Dictionary<string, object>>(raw);
        return result!.FirstOrDefault(x => x.Key == "jwt").Value.ToString()!;
    }
    public void CreateUserSession(string tokenRaw, bool rememberme = true){
        //HttpContext.Session.Clear();
        HttpContext.SignOutAsync();

        /*
        string userId, username, userPicture;
        try
        {
            JwtSecurityToken? token = _jwtHandler.ReadJwtToken(tokenRaw);
            Claim? c_nameid = token.Claims.FirstOrDefault(claim => claim.Type == "nameid");
            Claim? c_username = token.Claims.FirstOrDefault(claim => claim.Type == "unique_name");
            Claim? c_userPicture = token.Claims.FirstOrDefault(claim => claim.Type == "actort");
            if(c_nameid != null && c_username != null && c_userPicture != null){
                userId = c_nameid.Value;
                username = c_username.Value;
                userPicture = c_userPicture.Value;
            }
            else{
                return;
            }
        }
        catch (Exception){
            return;
        }
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Actor, userPicture)
        };
        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);
        */


        JwtSecurityToken token = _jwtHandler.ReadJwtToken(tokenRaw);
        var principal = new ClaimsPrincipal(new ClaimsIdentity(token.Claims, CookieAuthenticationDefaults.AuthenticationScheme));
        
        var sessionSettings = new AuthenticationProperties{
            IsPersistent = true,
            ExpiresUtc = DateTime.UtcNow.AddMonths(1)
        };
        var coockieSettings = new CookieOptions{
            IsEssential = true,
            Expires = DateTime.UtcNow.AddMonths(1)
        };
        if(rememberme == false){
            sessionSettings.ExpiresUtc = DateTime.UtcNow.AddHours(4);
            coockieSettings.Expires = DateTime.UtcNow.AddHours(4);
        }
        HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, sessionSettings);
        HttpContext.Response.Cookies.Append("UserAuth", "True", coockieSettings);
    }
}







/* UserLogin backup
    public async Task<IActionResult> UserLogin(AccountRead2 account)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        if((int)apiResponse.StatusCode == 404){
            
        }
        string newToken = await getJwtFromResponse(apiResponse);
        if(newToken != null)
            CreateUserSession(newToken);
        return RedirectToAction("Index", "Home");
    }
    */


/*
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "OK"){
            string newToken = await getJwtFromResponse(apiResponse);
            if(newToken != null)
                CreateUserSession(newToken);
        }
        else if(statusCode == "480"){
            
        }
        else if(statusCode == "481"){

        }
        else if(statusCode == "422"){
            
        }
        return RedirectToAction("Index", "Home");
    }
*/



    //Trying login endpoint
    /*
    public async Task<IActionResult> GoogleSigninDirectly(HttpResponse request)
    {
        string text = request.ToString();
        
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/signin-external", request);
        if((int)apiResponse.StatusCode == 480){
            //Token is malicious
        }
        else if((int)apiResponse.StatusCode == 580){
            //Data couldn't be saved in database
        }
        else if((int)apiResponse.StatusCode == 581){
            //Couldn't find the user
        }
        string newToken = await getJwtFromResponse(apiResponse);
        if(newToken != null){
            CreateUserSession(newToken);
        }
        
        return RedirectToAction("Index", "Home");
    }*/