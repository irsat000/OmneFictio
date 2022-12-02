using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using System.Text.Json;
using System.Web;

namespace OmneFictio.Web.Controllers;
public class ProfileController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private int? AccountId = null;

    public ProfileController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory, IHttpContextAccessor IHttpContextAccessor)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        //check account
        AccountId = UserController.checkUserLogin(IHttpContextAccessor.HttpContext);
    }

    [HttpGet("u/{username?}/{path?}")]
    public IActionResult Profile(string username, string path)
    {
        
        return View();
    }
}