using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using Models;
using System.Text.Json;

namespace OmneFictio.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public HomeController(ILogger<HomeController> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    public async Task<IActionResult> Index()
    {
        return View();
    }

    public async Task<IActionResult> Read(string? type)
    {
        List<PostRead1>? posts = new List<PostRead1>();
        string postsUrl = "https://localhost:7022/posts";
        
        string raw = await _httpClient.GetStringAsync(postsUrl);

        //posts = JsonConvert.DeserializeObject<List<PostRead1>>(raw);
        posts = JsonSerializer.Deserialize<List<PostRead1>>(raw);
        ReadViewmodel viewModel = new ReadViewmodel{
            posts = posts
        };

        return View(viewModel);
    }
    public IActionResult Register()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    
    public async Task<IActionResult> UserRegistration(AccountWrite1 account)
    {
        var registerResult = await _httpClient.PostAsJsonAsync("https://localhost:7022/register", account);
        return RedirectToAction("Index", "Home");
    }
    public async Task<IActionResult> UserLogin(AccountRead2 account)
    {
        var loginResult = await _httpClient.PostAsJsonAsync("https://localhost:7022/login", account);
        string token = await loginResult.Content.ReadAsStringAsync();
        Console.WriteLine(token);
        return RedirectToAction("Index", "Home");
    }
}
