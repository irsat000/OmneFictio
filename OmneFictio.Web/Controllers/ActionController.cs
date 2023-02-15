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
        request.accountId = AccountId;

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
        request.accountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/Rate", request);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode == "OK")
            return new JsonResult(Ok());
        else if (statusCode == "Accepted")
            return new JsonResult(Accepted());
        else
            return new JsonResult(BadRequest());
    }

    [HttpPost]
    public async Task<JsonResult> SavePost([FromBody] SavedPostWrite request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.accountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/SavePost", request);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode == "OK")
            return new JsonResult(Ok());
        else if (statusCode == "Accepted")
            return new JsonResult(Accepted());
        else
            return new JsonResult(BadRequest());
    }

    [HttpPost]
    public async Task<JsonResult> AddReply([FromBody] ReplyInput request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.accountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/AddReply", request);
        string statusCode = apiResponse.StatusCode.ToString();
        if (statusCode != "OK")
        {
            return new JsonResult(BadRequest());
        }
        string returnedContent = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(returnedContent));
    }

    [HttpPost]
    public async Task<JsonResult> AddComment([FromBody] CommentInput request)
    {
        if (AccountId == null)
        {
            return new JsonResult(Unauthorized());
        }
        request.accountId = AccountId;

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
        request.accountId = AccountId;


        string? coverImage_WhenOk = null; //Backup the image because I will not send it to API
        if (request.coverImage != null)
        {
            coverImage_WhenOk = request.coverImage;
            request.coverImage = null;
            request.coverSent = true;
        }

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/CreatePost", request);
        string statusCode = apiResponse.StatusCode.ToString();
        if (statusCode == "OK" && coverImage_WhenOk != null)
        {
            var dictResult = await _helperServices.getDictFromResponse(apiResponse);
            dictResult!.TryGetValue("coverImageName", out string? cvrImgName);

            if (System.IO.File.Exists($"wwwroot/images/covers/{cvrImgName}"))
            {
                System.IO.File.Delete($"wwwroot/images/covers/{cvrImgName}");
            }

            byte[] picBytes = Convert.FromBase64String(coverImage_WhenOk);
            await System.IO.File.WriteAllBytesAsync($"wwwroot/images/covers/{cvrImgName}", picBytes);

            return new JsonResult(Ok());
        }
        else if (statusCode == "Accepted")
        {
            return new JsonResult(Accepted());
        }
        return new JsonResult(BadRequest());
    }

}