using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using OmneFictio.Web.CommentReadModel;
using OmneFictio.Web.CommentReadModel2;
using System.Text.Json;
using OmneFictio.Web.PostReadModel;
using System.Web;

namespace OmneFictio.Web.Controllers;
//ALL REQUESTS WILL GIVE AN API KEY
public class ReadingController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ReadingController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory, IConfiguration iConfig)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
        _configuration = iConfig;

        _httpClient.DefaultRequestHeaders.Add("ApiKey", _configuration.GetSection("ApiKey").Value);
    }

    [HttpGet("p/{postid}")]
    public async Task<IActionResult> Post(string postid)
    {
        var apiResponse = await _httpClient
            .GetAsync("Read/GetPost/" + postid);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return RedirectToAction("Index", "Home");
        }

        PostRead1? post = JsonSerializer.Deserialize<PostRead1>
            (await apiResponse.Content.ReadAsStringAsync());
        if (post != null)
            return View(new GetpostViewmodel(post));
        else
            return RedirectToAction("Index", "Home");
    }


    //fetch api - get posts
    [HttpGet("g/GetPosts")]
    public async Task<JsonResult> GetPosts(int? page, int? ppp)
    {
        //Create url (filters)
        var url = new UriBuilder(_httpClient.BaseAddress!.AbsoluteUri + "Read/GetPosts");
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

        /*var respond = JsonSerializer.Deserialize<Dictionary<string, object>>(rawString);
        string posts = respond!.FirstOrDefault(x => x.Key == "posts").Value.ToString()!;
        string pages = respond!.FirstOrDefault(x => x.Key == "pages").Value.ToString()!;*/
    }


    //fetch api - get post's comments
    [HttpGet("g/GetComments/{postid}")]
    public async Task<JsonResult> GetComments(int postid)
    {
        string url = "Read/GetComments/" + postid;
        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }

        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    [HttpGet("g/GetHighlightedReply/{commentId}")]
    public async Task<JsonResult> GetHighlightedReply(int commentId)
    {
        string url = "Read/GetHighlightedReply/" + commentId;
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
        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

    [HttpGet("g/CheckVoteByUser")]
    public async Task<JsonResult> CheckVoteByUser(int TargetId, string TargetType)
    {
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
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


    [HttpGet("g/CheckRateByUser/{postid}")]
    public async Task<JsonResult> CheckRateByUser(string postid)
    {
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        string url = $"Read/CheckRateByUser/{postid}/{AccountId}";
        //Request
        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.StatusCode.ToString() != "OK")
        {
            return new JsonResult(NotFound());
        }
        //return
        string content = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(content));
    }

}