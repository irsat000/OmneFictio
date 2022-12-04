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

    [HttpGet("u/GetPosts/{targetUsername}")]
    public async Task<JsonResult> GetPosts(string targetUsername)
    {
        string url = $"Profile/GetPosts/{targetUsername}";
        if(AccountId != null){
            url += $"/{AccountId}";
        }
        try
        {
            //request
            var apiResponse = await _httpClient.GetAsync(url.ToString());
            int deneme = (int)apiResponse.StatusCode;
            if ((int)apiResponse.StatusCode != 200)
            {
                return new JsonResult(NotFound());
            }
            //return
            string content = await apiResponse.Content.ReadAsStringAsync();
            return new JsonResult(Ok(content));
        }
        catch (System.Exception)
        {
            return new JsonResult(StatusCode(500));
        }
    }
}