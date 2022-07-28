using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using OmneFictio.Web.Models;
using QuickType;

namespace OmneFictio.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
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
        using (HttpClient httpClient = new HttpClient())
        {
            stopwatch2.Start();
            string raw = httpClient.GetStringAsync(postsUrl).Result;
            stopwatch2.Stop();

            stopwatch3.Start();
            posts = JsonConvert.DeserializeObject<List<PostRead1>>(raw);
            stopwatch3.Stop();
        }
        ReadViewmodel viewModel = new ReadViewmodel{
            posts = posts
        };

        Console.WriteLine($"getting raw data: {stopwatch2.Elapsed}");
        Console.WriteLine($"deserializing: {stopwatch3.Elapsed}");
        return View(viewModel);
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
