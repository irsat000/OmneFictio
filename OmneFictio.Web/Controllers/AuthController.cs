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
        var request = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        string token = await request.Content.ReadAsStringAsync();
        string newTokenRaw = await DeserializeRaw(request);
        if(newTokenRaw != null)
            CreateUserSession(newTokenRaw);
        return RedirectToAction("Index", "Home");
    }
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        var request = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        string newTokenRaw = await DeserializeRaw(request);
        if(newTokenRaw != null)
            CreateUserSession(newTokenRaw);
        return RedirectToAction("Index", "Home");
    }

    public async Task<JsonResult> GoogleSignup(string token)
    {
        var request = await _httpClient.PostAsJsonAsync("https://localhost:7022/register-external", token);
        string newTokenRaw = await DeserializeRaw(request);
        if(newTokenRaw != null){
            CreateUserSession(newTokenRaw);
            return new JsonResult(Ok());
        }
        else
            return new JsonResult(BadRequest("No token returned"));
    }
    public async Task<string> DeserializeRaw(HttpResponseMessage request){
        string raw = await request.Content.ReadAsStringAsync();
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
    }
    
    public async Task<IActionResult> Deneme()
    {
        return View();
    }
}
