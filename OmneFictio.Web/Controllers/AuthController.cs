using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

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
    //fetch api manual login function 1
    [HttpPost]
    public async Task<JsonResult> UserLogin([FromBody] AccountRead2 account)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        if((int)apiResponse.StatusCode == 404){
            
        }
        string newToken = await getJwtFromResponse(apiResponse);
        if(newToken != null)
            CreateUserSession(newToken);
        return new JsonResult(Ok());
    }
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        if((int)apiResponse.StatusCode == 430){
            
        }
        else if((int)apiResponse.StatusCode == 431){

        }
        else if((int)apiResponse.StatusCode == 422){
            
        }
        string newToken = await getJwtFromResponse(apiResponse);
        if(newToken != null)
            CreateUserSession(newToken);
        return RedirectToAction("Index", "Home");
    }

    public async Task<JsonResult> GoogleSignin(string googleToken)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/signin-external", googleToken);
        if((int)apiResponse.StatusCode == 430){
            //Token is malicious
            return new JsonResult(StatusCode(430));
        }
        else if((int)apiResponse.StatusCode == 530){
            //Data couldn't be saved in database
            return new JsonResult(StatusCode(530));
        }
        else if((int)apiResponse.StatusCode == 531){
            //Couldn't find the user
            return new JsonResult(StatusCode(531));
        }
        else if(apiResponse == null){
            //Api request failed
            return new JsonResult(StatusCode(532));
        }
        string newToken = await getJwtFromResponse(apiResponse);
        if(newToken != null){
            CreateUserSession(newToken);
            return new JsonResult(Ok());
        }
        else
            return new JsonResult(StatusCode(532));
    }
    public async Task<string> getJwtFromResponse(HttpResponseMessage response){
        string raw = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Dictionary<string, object>>(raw);
        return result!.FirstOrDefault(x => x.Key == "jwt").Value.ToString()!;
    }
    public void CreateUserSession(string tokenRaw){
        HttpContext.Session.Clear();
        var token = _jwtHandler.ReadJwtToken(tokenRaw);
        string userId = token.Claims.First(claim => claim.Type == "nameid").Value;
        string username = token.Claims.First(claim => claim.Type == "unique_name").Value;
        HttpContext.Session.SetString("userId", userId);
        HttpContext.Session.SetString("username", username);

        string userPicture = token.Claims.First(claim => claim.Type == "actort").Value;
        if(userPicture != "" || userPicture != null){
            HttpContext.Response.Cookies.Delete("userPicture");
            HttpContext.Response.Cookies.Append("userPicture", userPicture);
        }
    }
    
    public IActionResult LogOut(){
        HttpContext.Session.Clear();
        HttpContext.Response.Cookies.Delete("userPicture");
        return RedirectToAction("Index", "Home");
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