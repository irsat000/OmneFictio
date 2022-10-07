
using OmneFictio.Web.Models;
using OmneFictio.Web.PostReadModel;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace OmneFictio.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public HomeController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
    }

    [HttpGet("/")]
    public IActionResult Index()
    {
        /*IndexViewmodel viewModel = new IndexViewmodel{
            sessionUserId = HttpContext.Session.GetString("userId"),
            sessionUsername = HttpContext.Session.GetString("username")
        };*/
        return View();
    }

    [HttpGet("Read/{Type}")]
    public async Task<IActionResult> Read(string Type, string? page)
    {
        /* WORKS
        if(page != null)
            Console.WriteLine(" this is the page we are in -> "+ page);
        else 
            Console.WriteLine("No querystring so this is first page");
        */

        /*ReadViewmodel viewModel = new ReadViewmodel{};*/
        return View();
    }

    [HttpGet("Register")]
    public IActionResult Register()
    {
        return View();
    }

    [HttpGet("Publish")]
    public IActionResult Publish()
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
