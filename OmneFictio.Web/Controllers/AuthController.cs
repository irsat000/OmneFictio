using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using Models;
using System.Text.Json;

namespace OmneFictio.Web.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public AuthController(ILogger<HomeController> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        /*AccountWrite1 user = account;
        if(account.PrefLanguageId == 0){
            user.PrefLanguageId = null;
        }
        Api code already checks if there is a language id with 0,
        this code is not needed*/
        var request = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        return RedirectToAction("Index", "Home");
    }
    public async Task<IActionResult> UserLogin(AccountRead2 account)
    {
        var request = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        string token = await request.Content.ReadAsStringAsync();
        return RedirectToAction("Index", "Home");
    }

    public async Task<JsonResult> GoogleSignup(string token)
    {
        var request = await _httpClient.PostAsJsonAsync("https://localhost:7022/register-external", token);
        string result = await request.Content.ReadAsStringAsync();
        return new JsonResult(Ok());
    }
}
