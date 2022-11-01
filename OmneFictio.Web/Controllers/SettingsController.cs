using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using System.Text.Json;
using System.Web;

namespace OmneFictio.Web.Controllers;
//ALL REQUESTS WILL GIVE AN API KEY
public class SettingsController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private int? AccountId = null;

    public SettingsController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory, IHttpContextAccessor IHttpContextAccessor)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        //check account
        AccountId = UserController.checkUserLogin(IHttpContextAccessor.HttpContext);
    }

    [HttpGet("settings/{path?}")]
    public IActionResult Settings(string path)
    {
        
        return View();
    }
}