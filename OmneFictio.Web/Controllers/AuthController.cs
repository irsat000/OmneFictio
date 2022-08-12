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
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "NotFound")
            return NotFound();
        else{
            string newToken = await getJwtFromResponse(apiResponse);
            if(newToken != null){
                CreateUserSession(newToken);
                return Ok();
            }
            else
                return StatusCode(530);
        }
    }
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "OK"){
            string newToken = await getJwtFromResponse(apiResponse);
            if(newToken != null)
                CreateUserSession(newToken);
        }
        else if(statusCode == "430"){
            
        }
        else if(statusCode == "431"){

        }
        else if(statusCode == "422"){
            
        }
        return RedirectToAction("Index", "Home");
    }

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
                return new JsonResult(StatusCode(532));
        }
        else if(statusCode == "430"){
            //Token is malicious
            return new JsonResult(StatusCode(430));
        }
        else if(statusCode == "530"){
            //Data couldn't be saved in database
            return new JsonResult(StatusCode(530));
        }
        else if(statusCode == "531"){
            //Couldn't find the user
            return new JsonResult(StatusCode(531));
        }
        else{
            //Api request utterly failed
            return new JsonResult(StatusCode(532));
        }
    }
    public IActionResult LogOut(){
        HttpContext.Session.Clear();
        HttpContext.SignOutAsync();
        return RedirectToAction("Index", "Home");
    }





    
    public async Task<string> getJwtFromResponse(HttpResponseMessage response){
        string raw = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Dictionary<string, object>>(raw);
        return result!.FirstOrDefault(x => x.Key == "jwt").Value.ToString()!;
    }
    public void CreateUserSession(string tokenRaw){
        HttpContext.Session.Clear();
        var token = _jwtHandler.ReadJwtToken(tokenRaw);
        string userId = token.Claims.FirstOrDefault(claim => claim.Type == "nameid")?.Value;
        string username = token.Claims.FirstOrDefault(claim => claim.Type == "unique_name")?.Value;
        string userPicture = token.Claims.FirstOrDefault(claim => claim.Type == "actort")?.Value;
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Actor, userPicture)
        };
        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);
        var sessionSettings = new AuthenticationProperties{
            IsPersistent = true,
            ExpiresUtc = DateTime.UtcNow.AddMonths(1)
        };
        HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, sessionSettings);
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







    //Trying login endpoint
    /*
    public async Task<IActionResult> GoogleSigninDirectly(HttpResponse request)
    {
        string text = request.ToString();
        
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/signin-external", request);
        if((int)apiResponse.StatusCode == 430){
            //Token is malicious
        }
        else if((int)apiResponse.StatusCode == 530){
            //Data couldn't be saved in database
        }
        else if((int)apiResponse.StatusCode == 531){
            //Couldn't find the user
        }
        string newToken = await getJwtFromResponse(apiResponse);
        if(newToken != null){
            CreateUserSession(newToken);
        }
        
        return RedirectToAction("Index", "Home");
    }*/