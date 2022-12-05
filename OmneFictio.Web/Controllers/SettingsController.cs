using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Infrastructure;
using OmneFictio.Web.Models;
using System.Text.Json;
using System.Web;

namespace OmneFictio.Web.Controllers;
public class SettingsController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IHelperServices _helperServices;
    private int? AccountId = null;

    public SettingsController(ILogger<HomeController> logger,
                                IHttpClientFactory httpClientFactory,
                                IHelperServices helperServices)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        _helperServices = helperServices;
        //check account
        AccountId = _helperServices.checkUserLogin();
    }

    [HttpGet("settings/{path?}")]
    public IActionResult Settings(string path)
    {

        return View();
    }
}