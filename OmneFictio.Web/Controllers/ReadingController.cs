using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using OmneFictio.Web.CommentReadModel;
using System.Text.Json;
using OmneFictio.Web.PostReadModel;

namespace OmneFictio.Web.Controllers;

public class ReadingController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public ReadingController(ILogger<HomeController> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }

    

    [HttpGet("p/{postid}")]
    public async Task<IActionResult> Post(string postid)
    {
        string url = "https://localhost:7022/getpost/" + postid;
        string raw = await _httpClient.GetStringAsync(url);

        PostRead1? post = JsonSerializer.Deserialize<PostRead1>(raw);

        if(post == null){
            return RedirectToAction("Index", "Home");
        }
        GetpostViewmodel viewModel = new GetpostViewmodel{
            post = post
        };
        return View(viewModel);
    }


    //fetch api - get post's comments
    [HttpGet("g/GetComments/{postid}")]
    public async Task<JsonResult> GetComments(int postid)
    {
        string url = "https://localhost:7022/getcomments/" + postid;
        string apiResponse = await _httpClient.GetStringAsync(url);
        
        List<CommentRead1>? comments = JsonSerializer.Deserialize<List<CommentRead1>>(apiResponse);

        if(comments == null || comments.Count() < 1) {
            return new JsonResult(NotFound());
        }
        //return new JsonResult(NotFound());
        return new JsonResult(Ok(comments));
    }

    
    //fetch api - get comment and its replies
    [HttpGet("g/GetComment/{commentId}")]
    public async Task<JsonResult> GetComment(int commentId)
    {
        string url = "https://localhost:7022/getcomment/" + commentId;
        string apiResponse = await _httpClient.GetStringAsync(url);
        
        CommentRead2? comment = JsonSerializer.Deserialize<CommentRead2>(apiResponse);

        if(comment == null || comment.deletedStatus.body != "Default") {
            return new JsonResult(NotFound());
        }
        //return new JsonResult(NotFound());
        return new JsonResult(Ok(comment));
    }




}