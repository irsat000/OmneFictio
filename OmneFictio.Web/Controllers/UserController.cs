using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;

namespace OmneFictio.Web.Controllers;

public class UserController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public UserController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
    }

    public static int? checkUserLogin(HttpContext? context){
        try
        {
            if(context == null)
                return null;
            int? accountid = Convert.ToInt32(context.User.Claims.FirstOrDefault
            (claim => claim.Type == "nameid")?.Value);
            return accountid;
        }
        catch (Exception) { return null; } 
    }

}