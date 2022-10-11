using Microsoft.AspNetCore.Mvc;

namespace OmneFictio.WebApi.Controllers;

[ApiController]
[Route("Reading")]
public class ReadingController : ControllerBase
{
    private readonly ILogger<ReadingController> _logger;

    public ReadingController(ILogger<ReadingController> logger)
    {
        _logger = logger;
    }

    [HttpGet("GetPosts")]
    public async Task<ActionResult<>> GetPosts()
    {
        var posts = db.Posts
            .Where(p =>
                p.IsPublished == true &&
                p.DeletedStatus!.Body == "Default")
            .OrderByDescending(p => p.PublishDate);
        int pageCount = (posts.Count() + opt.MaxPostPerPage - 1) / opt.MaxPostPerPage;
        var posts_onepage = await mapper.ProjectTo<PostDtoRead_1>(posts)
            .Skip(opt.MaxPostPerPage * (opt.Page - 1))
            .Take(opt.MaxPostPerPage)
            .ToListAsync();

        /*if(posts_onepage.Count() == 0){
            return new { posts = posts_onepage, pages = pageCount };
        }*/
        return new { posts = posts_onepage, pages = pageCount };
    }

}
