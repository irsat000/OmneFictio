using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Infrastructure;
using OmneFictio.Web.Models;
using System.Text.Json;
using System.Web;

namespace OmneFictio.Web.Controllers;
//ALL REQUESTS WILL GIVE AN API KEY
public class ReadingController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IHelperServices _helperServices;
    private int? AccountId = null;

    public ReadingController(ILogger<HomeController> logger,
                            IHttpClientFactory httpClientFactory,
                            IHelperServices helperServices)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        _helperServices = helperServices;
        //check account
        AccountId = _helperServices.checkUserLogin();
    }

    [HttpGet("g/GetChapter/{postid}/{chapterindex}")]
    public async Task<IActionResult> GetChapter(int postid, int chapterindex)
    {
        string url = $"Read/GetChapter/{postid}/{chapterindex}";
        if (AccountId != null)
        {
            url += "/" + AccountId;
        }

        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    [HttpGet("g/GetPost/{postid}")]
    public async Task<IActionResult> GetPost(string postid)
    {
        string url = "Read/GetPost/" + postid;
        if (AccountId != null)
        {
            url += "/" + AccountId;
        }

        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    //fetch api - get posts
    [HttpGet("g/GetPosts")]
    public async Task<JsonResult> GetPosts(int? page, int? ppp)
    {
        string urlpath = "Read/GetPosts";
        if (AccountId != null)
        {
            urlpath += "/" + AccountId;
        }
        //Create url (filters)
        var url = new UriBuilder(_httpClient.BaseAddress!.AbsoluteUri + urlpath);
        var query = HttpUtility.ParseQueryString(url.Query);
        if (page != null)
        {
            query["page"] = page.ToString();
        }
        if (ppp != null)
        {
            query["ppp"] = ppp.ToString();
        }
        url.Query = query.ToString();

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


    //fetch api - get post's comments
    [HttpGet("g/GetComments/{type}/{parentid}")]
    public async Task<JsonResult> GetComments(string type, int parentid)
    {
        string url = $"Read/GetComments/{type}/{parentid}";
        if (AccountId != null)
        {
            url += "/" + AccountId;
        }

        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    //fetch api - get comment and its replies
    [HttpGet("g/GetComment/{commentId}")]
    public async Task<JsonResult> GetComment(int commentId)
    {
        string url = "Read/GetComment/" + commentId;
        if (AccountId != null)
        {
            url += "/" + AccountId;
        }

        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    //get top posts
    [HttpGet("g/GetTopPosts")]
    public async Task<JsonResult> GetTopPosts()
    {
        string url = "Read/GetTopPosts";
        if (AccountId != null)
        {
            url += "/" + AccountId;
        }

        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }
    /*
    OUTDATED. But I might use this for special occasions.
        [HttpGet("g/CheckVoteByUser")]
        public async Task<JsonResult> CheckVoteByUser(int TargetId, string TargetType)
        {
            if (AccountId == null)
            {
                return new JsonResult(Unauthorized());
            }
            //Create url (filters)
            var url = new UriBuilder(_httpClient.BaseAddress!.AbsoluteUri + "Read/CheckVoteByUser");
            var query = HttpUtility.ParseQueryString(url.Query);
            query["AccountId"] = AccountId.ToString();
            query["TargetId"] = TargetId.ToString();
            query["TargetType"] = TargetType.ToString();
            url.Query = query.ToString();
            //Request
            var apiResponse = await _httpClient.GetAsync(url.ToString());
            if (apiResponse.StatusCode.ToString() != "OK")
            {
                return new JsonResult(NotFound());
            }
            //return
            string content = await apiResponse.Content.ReadAsStringAsync();
            return new JsonResult(Ok(content));
        }
    */

}