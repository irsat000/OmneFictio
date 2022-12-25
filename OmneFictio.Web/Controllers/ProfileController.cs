using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Infrastructure;
using OmneFictio.Web.Models;
using System.Text.Json;
using System.Web;

namespace OmneFictio.Web.Controllers;
public class ProfileController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IHelperServices _helperServices;
    private int? AccountId = null;

    public ProfileController(ILogger<HomeController> logger,
                            IHttpClientFactory httpClientFactory,
                            IHelperServices helperServices)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        _helperServices = helperServices;
        //check account
        AccountId = _helperServices.checkUserLogin();
    }

    [HttpGet("u/{username?}/{path?}")]
    public IActionResult Profile(string username, string path)
    {
        
        return View();
    }

    [HttpGet("u/GetUserInfo/{targetUsername}")]
    public async Task<JsonResult> GetUserInfo(string targetUsername)
    {
        string url = $"Profile/GetProfileDetails/{targetUsername}";
        if(AccountId != null){
            url += $"/{AccountId}";
        }
        try
        {
            //request
            var apiResponse = await _httpClient.GetAsync(url.ToString());
            if (apiResponse.StatusCode.ToString() != "OK")
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
            if (apiResponse.StatusCode.ToString() != "OK")
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

    [HttpGet("u/GetReviews/{targetUsername}")]
    public async Task<JsonResult> GetReviews(string targetUsername){
        string url = $"Profile/GetReviews/{targetUsername}";
        if(AccountId != null){
            url += "/" + AccountId;
        }
        try
        {
            //request
            var apiResponse = await _httpClient.GetAsync(url);
            if (apiResponse.StatusCode.ToString() != "OK")
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

    [HttpGet("u/GetSavedPosts/{targetUsername}")]
    public async Task<JsonResult> GetSavedPosts(string targetUsername)
    {
        string url = $"Profile/GetSavedPosts/{targetUsername}";
        if(AccountId != null){
            url += $"/{AccountId}";
        }
        try
        {
            //request
            var apiResponse = await _httpClient.GetAsync(url.ToString());
            if (apiResponse.StatusCode.ToString() != "OK")
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