using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using OmneFictio.Web.CommentReadModel;
using OmneFictio.Web.CommentReadModel2;
using System.Text.Json;
using OmneFictio.Web.PostReadModel;

namespace OmneFictio.Web.Controllers;

public class ReadingController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;

    public ReadingController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
    }

    [HttpGet("p/{postid}")]
    public async Task<IActionResult> Post(string postid)
    {
        string url = "getpost/" + postid;
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


    //fetch api - get posts
    [HttpGet("g/GetPosts/{pageNumber}")]
    public async Task<JsonResult> GetPosts(string pageNumber)
    {
        GetPosts_Options opt = new GetPosts_Options();
        opt.MaxPostPerPage = 2;
        opt.Page = 2;
        var apiResponse = await _httpClient.PostAsJsonAsync("posts", opt);
        string rawString = await apiResponse.Content.ReadAsStringAsync();
        var respond = JsonSerializer.Deserialize<Dictionary<string, object>>(rawString);

        string posts = respond!.FirstOrDefault(x => x.Key == "posts").Value.ToString()!;
        string pages = respond!.FirstOrDefault(x => x.Key == "pages").Value.ToString()!;
        Console.WriteLine("asdfasdf -> " + pages);

        //It returns a list in json format.
        if(posts == "[]"){
            //If it's empty, it returns [].
            return new JsonResult(NotFound());
        }
        return new JsonResult(Ok(posts));
    }
    

    //fetch api - get post's comments
    [HttpGet("g/GetComments/{postid}")]
    public async Task<JsonResult> GetComments(int postid)
    {
        string url = "getcomments/" + postid;
        string apiResponse = await _httpClient.GetStringAsync(url);

        if(apiResponse == "[]") {
            return new JsonResult(NotFound());
        }
        return new JsonResult(Ok(apiResponse));
    }

    [HttpGet("g/GetHighlightedReply/{commentId}")]
    public async Task<JsonResult> GetHighlightedReply(int commentId)
    {
        string url = "get_highlighted_comment/" + commentId;
        string apiResponse = await _httpClient.GetStringAsync(url);

        //h means highlighted
        CommentReadModel2.Reply? h_reply = JsonSerializer.Deserialize<CommentReadModel2.Reply>(apiResponse);
         
        if(h_reply == null) {
            return new JsonResult(NotFound());
        } else {
            return new JsonResult(Ok(h_reply));
        }
    }

    
    //fetch api - get comment and its replies
    [HttpGet("g/GetComment/{commentId}")]
    public async Task<JsonResult> GetComment(int commentId)
    {
        string url = "getcomment/" + commentId;
        string apiResponse = await _httpClient.GetStringAsync(url);
        
        CommentRead2? comment = JsonSerializer.Deserialize<CommentRead2>(apiResponse);

        if(comment == null || comment.deletedStatus.body != "Default") {
            return new JsonResult(NotFound());
        }
        return new JsonResult(Ok(comment));
    }




}