
using OmneFictio.Web.Models;
using OmneFictio.Web.PostReadModel;
using OmneFictio.Web.PostReadModel2;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> Read(string Type)
    {
        //Stopwatch time = new Stopwatch();
        //time.Start();
        List<PostRead1>? posts = new List<PostRead1>();
        string postsUrl = "https://localhost:7022/posts";
        try
        {
            string raw = await _httpClient.GetStringAsync(postsUrl);
            posts = JsonSerializer.Deserialize<List<PostRead1>>(raw);
        }
        catch (Exception e)
        {
            if (e is HttpRequestException){
                //Api request error
            }
            else if(e is JsonException){
                //Couldn't deserialize api response
            }
        }
        ReadViewmodel viewModel = new ReadViewmodel{
            posts = posts
        };
        //time.Stop();
        //Console.WriteLine("elapsed time: " + time.Elapsed);
        Console.WriteLine("Type= " + Type);
        return View(viewModel);
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

    [HttpGet("p/{postid}")]
    public async Task<IActionResult> Post(string postid)
    {
        PostRead2? post = new PostRead2();
        string getPostUrl = "https://localhost:7022/getpost/" + postid;
        try
        {
            string raw = await _httpClient.GetStringAsync(getPostUrl);
            post = JsonSerializer.Deserialize<PostRead2>(raw);
        }
        catch (Exception e)
        {
            if (e is HttpRequestException){
                //Api request error
            }
            else if(e is JsonException){
                //Couldn't deserialize api response
            }
        }
        if(post == null){
            return RedirectToAction("Index", "Home");
        }
        GetpostViewmodel viewModel = new GetpostViewmodel{
            post = post
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
