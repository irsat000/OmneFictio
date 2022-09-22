using System.Security.Claims;
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