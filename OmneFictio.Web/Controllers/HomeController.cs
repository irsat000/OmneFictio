using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
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
        /*IndexViewmodel viewModel = new IndexViewmodel{
            sessionUserId = HttpContext.Session.GetString("userId"),
            sessionUsername = HttpContext.Session.GetString("username")
        };*/
        return View();
    }

    public async Task<IActionResult> Read(string? type)
    {
        List<PostRead1>? posts = new List<PostRead1>();
        string postsUrl = "https://localhost:7022/posts";
        
        string raw = await _httpClient.GetStringAsync(postsUrl);

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
}
