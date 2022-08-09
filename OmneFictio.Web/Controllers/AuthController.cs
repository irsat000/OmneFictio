using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;

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

    
    public async Task<IActionResult> UserLogin(AccountRead2 account)
    {
        var response = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        if((int)response.StatusCode == 404){
            
        }
        string token = await response.Content.ReadAsStringAsync();
        string newTokenRaw = await getJwtFromResponse(response);
        if(newTokenRaw != null)
            CreateUserSession(newTokenRaw);
        return RedirectToAction("Index", "Home");
    }
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        var response = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        if((int)response.StatusCode == 430){
            
        }
        else if((int)response.StatusCode == 431){

        }
        else if((int)response.StatusCode == 422){
            
        }
        string newTokenRaw = await getJwtFromResponse(response);
        if(newTokenRaw != null)
            CreateUserSession(newTokenRaw);
        return RedirectToAction("Index", "Home");
    }

    public async Task<JsonResult> GoogleSignin(string token)
    {
        var response = await _httpClient.PostAsJsonAsync("https://localhost:7022/signin-external", token);
        if((int)response.StatusCode == 400){
            return new JsonResult(StatusCode(400));
        }
        else if((int)response.StatusCode == 530){
            return new JsonResult(StatusCode(530));
        }
        else if((int)response.StatusCode == 531){
            return new JsonResult(StatusCode(531));
        }
        string newTokenRaw = await getJwtFromResponse(response);
        if(newTokenRaw != null){
            CreateUserSession(newTokenRaw);
            return new JsonResult(Ok());
        }
        else
            return new JsonResult(UnprocessableEntity());
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
    public async Task<IActionResult> Deneme()
    {
        return View();
    }
}
