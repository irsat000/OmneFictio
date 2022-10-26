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

    public static int? checkUserLogin(HttpContext HttpContext){
        try
        {
            int? accountid = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault
            (claim => claim.Type == "nameid")?.Value);
            return accountid;
        }
        catch (Exception)
        {
            return null;
        } 
    }

}