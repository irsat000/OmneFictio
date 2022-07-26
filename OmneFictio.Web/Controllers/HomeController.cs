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
        List<PostRead1>? posts = new List<PostRead1>();
        string postsUrl = "https://localhost:7022/posts";
        using (HttpClient httpClient = new HttpClient())
        {
            using (HttpResponseMessage response = await httpClient.GetAsync(postsUrl))
            {
                using (HttpContent content = response.Content)
                {
                    var raw = await content.ReadAsStringAsync();
                    posts = JsonConvert.DeserializeObject<List<PostRead1>>(raw);
                }
            }
        }
        ReadViewmodel viewModel = new ReadViewmodel{
            posts = posts
        };
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
