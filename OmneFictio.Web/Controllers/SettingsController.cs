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

    [HttpGet("u/GetAccountInformation")]
    public async Task<JsonResult> GetAccountInformation()
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }

        var apiResponse = await _httpClient
            .GetAsync("Settings/GetAccountInformation/" + AccountId);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        /*var dictResult = await _helperServices.getDictFromResponse(apiResponse);
        dictResult!.TryGetValue("account", out var accountInfo);*/
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    [HttpPost("u/UpdateAccountInformation")]
    public async Task<JsonResult> UpdateAccountInformation([FromBody] AccountUpdate request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.id = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Settings/UpdateAccountInformation/", request);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }

}