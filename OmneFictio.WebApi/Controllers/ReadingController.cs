using OmneFictio.WebApi.Entities;
using OmneFictio.WebApi.Dtos;
using OmneFictio.WebApi.Models;
using OmneFictio.WebApi.Configurations;
//basic
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
//tools
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;
using BC = BCrypt.Net.BCrypt;
using System.Data.Entity.Validation;
using Google.Apis.Auth;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace OmneFictio.WebApi.Controllers;

[ApiController]
[Route("Reading")]
public class ReadingController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ReadingController> _logger;

    public ReadingController(ILogger<ReadingController> logger, IMapper mapper, OmneFictioContext db)
    {
        _logger = logger;
        _mapper = mapper;
        if (_mapper == null){
            throw new InvalidOperationException("Mapper not found");
        }
        _db = db;
    }

    [HttpPost("GetPosts")]
    public async Task<IActionResult> GetPosts([FromBody] GetPosts_Options opt)
    {
        //Get with filters
        var posts = _db.Posts
            .Where(p =>
                p.isPublished == true &&
                p.deletedStatus!.body == "Default")
            .OrderByDescending(p => p.publishDate);
        //get page count
        int pageCount = (posts.Count() + opt.MaxPostPerPage - 1) / opt.MaxPostPerPage;
        //limit to page
        var posts_onepage = await _mapper.ProjectTo<PostDtoRead_1>(posts)
            .Skip(opt.MaxPostPerPage * (opt.Page - 1))
            .Take(opt.MaxPostPerPage)
            .ToListAsync();

        /*if(posts_onepage.Count() == 0){
            return new { posts = posts_onepage, pages = pageCount };
        }*/
        return Ok(new { posts = posts_onepage, pages = pageCount });
    }

}
