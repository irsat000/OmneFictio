using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using Models;
using System.Text.Json;

namespace OmneFictio.Web.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public AuthController(ILogger<HomeController> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    [HttpPost]
    //[Route("google-signup")]
    public JsonResult GoogleSignup(String jwt)
    {
        return new JsonResult(Ok());
    }
}
