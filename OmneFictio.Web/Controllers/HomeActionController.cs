using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;

namespace OmneFictio.Web.Controllers;

public class HomeActionController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public HomeActionController(ILogger<HomeController> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    
    [HttpPost]
    public async Task<JsonResult> AddComment([FromBody] CommentWrite1 request)
    {
        int accountid = checkUserLogin();
        if(accountid == -1){
            return new JsonResult(StatusCode(499));
        }
        request.AccountId = accountid;

        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/add_comment", request);
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
        int accountid = checkUserLogin();
        if(accountid == -1){
            return new JsonResult(Unauthorized());
        }
        request.AccountId = accountid;

        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/rate", request);
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
    [HttpGet("g/CheckRateByUser/{postid}")]
    public async Task<JsonResult> CheckRateByUser(string postid)
    {
        int accountid = checkUserLogin();
        if(accountid == -1){
            return new JsonResult(StatusCode(499));
        }
        string url = $"https://localhost:7022/check_rate_by_user/{postid}/{accountid}";
        string apiResponse = await _httpClient.GetStringAsync(url);

        if(apiResponse == "-1"){
            return new JsonResult(NotFound());
        } else {
            return new JsonResult(Ok(apiResponse));
        }
    }

    //Voting post/chapter/comment/reply
    [HttpPost]
    public async Task<IActionResult> Vote([FromBody] VoteWrite1 request)
    {
        int accountid = checkUserLogin();
        if(accountid == -1){
            return StatusCode(499);
        }
        request.AccountId = accountid;
        
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/vote", request);
        string statusCode = apiResponse.StatusCode.ToString();
        
        if(statusCode == "OK"){
            return Ok();
        }
        else if(statusCode == "480" || statusCode == "580"){
            //No user
            //Failed to save the data in database
            return StatusCode(580);
        }
        else{
            //Unknown error
            return StatusCode(599);
        }
    }
    [HttpPost]
    public async Task<JsonResult> CheckVoted([FromBody] CheckVoted request){
        int accountid = checkUserLogin();
        if(accountid == -1){
            return new JsonResult(StatusCode(499));
        }
        request.AccountId = accountid;
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/checkvoted", request);
        string statusCode = apiResponse.StatusCode.ToString();

        string value = await apiResponse.Content.ReadAsStringAsync();
        if(statusCode == "OK")
            return new JsonResult(Ok(value));
        else if(statusCode == "NotFound")
            return new JsonResult(Ok("none"));
        else
            return new JsonResult(StatusCode(580));
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] PostWrite1 request){
        int accountid = checkUserLogin();
        if(accountid == -1){
            return StatusCode(499);
        }
        request.AccountId = accountid;

        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/createpost", request);
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


    public int checkUserLogin(){
        int accountid = -1;
        int.TryParse((HttpContext.User.Claims.FirstOrDefault
            (claim => claim.Type == "nameid")?.Value ?? "-1"), out accountid);
        return accountid;
    }

}