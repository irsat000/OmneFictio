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

    
    [HttpPost]
    public async Task<JsonResult> AddComment([FromBody] CommentWrite1 request)
    {
        //check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("add_comment", request);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "OK"){
            string returnedContent = await apiResponse.Content.ReadAsStringAsync();
            return new JsonResult(Ok(returnedContent));
        } else {
            return new JsonResult(StatusCode(599));
        }
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

        var apiResponse = await _httpClient.PostAsJsonAsync("rate", request);
        string statusCode = apiResponse.StatusCode.ToString();
        
        if(statusCode == "OK"){
            return new JsonResult(Ok());
        }
        else if(statusCode == "BadRequest"){
            //unacceptable rate value
            return new JsonResult(BadRequest());
        }
        else{
            //Unknown error
            return new JsonResult(500);
        }
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
        
        if(statusCode == "OK"){
            return new JsonResult(Ok());
        }
        else{
            return new JsonResult(BadRequest());
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] PostWrite1 request){//check account
        int? AccountId = UserController.checkUserLogin(HttpContext);
        if(AccountId == null){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = AccountId;

        var apiResponse = await _httpClient.PostAsJsonAsync("createpost", request);
        string statusCode = apiResponse.StatusCode.ToString();

        //reminder: client side errors will be handled with js only
        if(statusCode == "OK"){
            return Ok();
        }
        else if(statusCode == "480"){
            //Inputs are not available
            return StatusCode(480);
        }
        else if(statusCode == "481"){
            //Title is longer than 250 character
            return StatusCode(481);
        }
        else if(statusCode == "482"){
            //Description is longer than 2000 character
            return StatusCode(482);
        }
        else if(statusCode == "483"){
            //Title is empty
            return StatusCode(483);
        }
        else if(statusCode == "484"){
            //Description is shorter than 50 character or empty
            return StatusCode(484);
        }
        else if(statusCode == "580"){
            //Failed to save the data in database
            return StatusCode(580);
        }
        else{
            //Unknown error
            return StatusCode(599);
        }
    }

}