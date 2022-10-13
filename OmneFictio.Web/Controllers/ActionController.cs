using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;

namespace OmneFictio.Web.Controllers;

public class ActionController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public ActionController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
    }


    //Voting post/chapter/comment/reply
    [HttpPost]
    public async Task<JsonResult> Vote([FromBody] VoteWrite1 request)
    {
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;
        
        var apiResponse = await _httpClient.PostAsJsonAsync("Action/Vote", request);
        string statusCode = apiResponse.StatusCode.ToString();
        
        if(statusCode != "OK"){
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }
    
    //rating the post
    [HttpPost]
    public async Task<JsonResult> RateThePost([FromBody] RateInfo request)
    {
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/Rate", request);
        string statusCode = apiResponse.StatusCode.ToString();
        
        if(statusCode != "OK"){
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }
    
    [HttpPost]
    public async Task<JsonResult> AddComment([FromBody] CommentWrite1 request)
    {
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/AddComment", request);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode != "OK"){
            return new JsonResult(BadRequest());
        }
        string returnedContent = await apiResponse.Content.ReadAsStringAsync();
        return new JsonResult(Ok(returnedContent));
    }

    [HttpPost]
    public async Task<JsonResult> CreatePost([FromBody] PostWrite1 request){
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("Action/CreatePost", request);
        string statusCode = apiResponse.StatusCode.ToString();

        //reminder: client side errors will be handled with js only
        if(statusCode != "OK"){
            return new JsonResult(BadRequest());
        }
        return new JsonResult(Ok());
    }

}