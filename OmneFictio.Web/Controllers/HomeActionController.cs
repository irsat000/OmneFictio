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
    public async Task<IActionResult> Vote([FromBody] VoteDtoWrite1 request)
    {
        int accountid;
        int.TryParse((HttpContext.User.Claims.FirstOrDefault
            (claim => claim.Type == ClaimTypes.NameIdentifier)?.Value ?? "-1"), out accountid);
        VoteDtoWrite1 vote = request;
        vote.AccountId = accountid;
        
        var apiResponse = await _httpClient.PostAsJsonAsync("https://localhost:7022/vote", vote);
        string statusCode = apiResponse.StatusCode.ToString();
        if(statusCode == "OK"){
            return Ok();
        }
        else if(statusCode == "480"){
            //No user
            return StatusCode(580);
        }
        else if(statusCode == "580"){
            //Failed to save the data in database
            return StatusCode(580);
        }
        else{
            //Unknown error
            return StatusCode(581);
        }
    }

}