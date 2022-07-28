using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using Models;
using System.Text.Json;

namespace OmneFictio.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    public HomeController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IActionResult> Index()
    {
        return View();
    }

    public async Task<IActionResult> Read(string? type)
    {
        Stopwatch stopwatch1 = new Stopwatch();
        Stopwatch stopwatch2 = new Stopwatch();
        Stopwatch stopwatch3 = new Stopwatch();

        List<PostRead1>? posts = new List<PostRead1>();
        string postsUrl = "https://localhost:7022/posts";
        
        stopwatch2.Start();
        using HttpClient httpClient = new();
        string raw = await httpClient.GetStringAsync(postsUrl);
        stopwatch2.Stop();

        stopwatch3.Start();
        //posts = JsonConvert.DeserializeObject<List<PostRead1>>(raw);
        posts = JsonSerializer.Deserialize<List<PostRead1>>(raw);
        stopwatch3.Stop();
        ReadViewmodel viewModel = new ReadViewmodel{
            posts = posts
        };

        Console.WriteLine($"getting raw data: {stopwatch2.Elapsed}");
        Console.WriteLine($"deserializing: {stopwatch3.Elapsed}");
        return View(viewModel);
        //return View(viewModel);
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
