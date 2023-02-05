
using OmneFictio.Web.Models;
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
        return View();
    }

    [HttpGet("Read/{Type}")]
    public IActionResult Read(string Type)
    {
        /*
        var location = new Uri($"{Request.Scheme}://{Request.Host}{Request.Path}{Request.QueryString}");
        HttpContext.Response.Cookies.Append("LastReadPage", location.AbsoluteUri,
            new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(1) });
        */
        return View();
    }

    [HttpGet("p/{postid}")]
    public IActionResult Post(int postid)
    {
        return View(new GetpostViewmodel(postid));
    }

    [HttpGet("p/{postid}/{chapterindex}")]
    public IActionResult Chapter(int postid, int chapterindex)
    {
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

    [HttpGet("Create")]
    public IActionResult Create()
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
