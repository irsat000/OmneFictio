using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Infrastructure;
using OmneFictio.Web.Models;

namespace OmneFictio.Web.Controllers;

public class ActionController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IHelperServices _helperServices;
    private int? AccountId = null;

    public ActionController(ILogger<HomeController> logger,
                            IHttpClientFactory httpClientFactory,
                            IHelperServices helperServices)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        _helperServices = helperServices;
        //check account
        AccountId = _helperServices.checkUserLogin();
    }


    //Voting post/chapter/comment/reply
    [HttpPost]
    public async Task<JsonResult> Vote([FromBody] VoteWrite1 request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/Vote", request);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode != "OK")
        {
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }

    //rating the post
    [HttpPost]
    public async Task<JsonResult> RateThePost([FromBody] RateInfo request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/Rate", request);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode != "OK")
        {
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }

    [HttpPost]
    public async Task<JsonResult> AddComment([FromBody] CommentWrite1 request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/AddComment", request);
        string statusCode = apiResponse.StatusCode.ToString();
        if (statusCode != "OK")
        {
            return new JsonResult(BadRequest());
        }
        string returnedContent = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(returnedContent));
    }

    [HttpPost]
    public async Task<JsonResult> CreatePost([FromBody] PostWrite1 request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        request.PostTypeId = byte.TryParse((string)request.PostTypeId, out byte postTypeId)
            ? postTypeId : 1;
        request.LanguageId = int.TryParse((string)request.LanguageId, out int languageId)
            ? languageId : 1;
        request.RatedAsId = int.TryParse((string?)request.RatedAsId, out int ratedAsId)
            ? ratedAsId : 1;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/CreatePost", request);
        string statusCode = apiResponse.StatusCode.ToString();

        //reminder: client side errors will be handled with js only
        if (statusCode != "OK")
        {
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }

}