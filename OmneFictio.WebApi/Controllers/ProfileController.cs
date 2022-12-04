using OmneFictio.WebApi.Entities;
using OmneFictio.WebApi.Dtos;
using OmneFictio.WebApi.Models;
using OmneFictio.WebApi.Configurations;
//basic
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
//tools
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using BC = BCrypt.Net.BCrypt;
using System.Data.Entity.Validation;
using Google.Apis.Auth;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using System.Diagnostics;

namespace OmneFictio.WebApi.Controllers;


[ApiController]
[Route("Profile")]
public class ProfileController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(ILogger<ProfileController> logger, IMapper mapper, OmneFictioContext db)
    {
        _logger = logger;
        _mapper = mapper;
        if (_mapper == null)
        {
            throw new InvalidOperationException("Mapper not found");
        }
        _db = db;
    }

    [HttpGet("GetPosts/{targetUsername}/{userId?}")]
    public async Task<IActionResult> GetPosts
        (string targetUsername, int? userId)
    {
        //Get the user's posts
        var posts = _db.Posts
            .Where(p =>
                p.isPublished == true &&
                p.deletedStatus!.body == "Default" &&
                p.account.username == targetUsername)
            .OrderByDescending(p => p.publishDate);
        //-----------
        var postList = await _mapper.ProjectTo<PostDtoRead_1>(posts)
            .ToListAsync();

        //Stopwatch elapsedTimeForExtras = new Stopwatch();
        foreach (PostDtoRead_1 post in postList)
        {
            //remove if the chapters are not published
            //Maybe I can fix this from the root later
            if (post.chapters != null && post.chapters.Count() > 0)
                post.chapters = post.chapters.Where(c => c.IsPublished == true).ToList();
            
            //elapsedTimeForExtras.Start();
            //Get comment and reply count
            var commentIds = _db.Comments
                .Where(x => x.targetPostId == post.id &&
                        x.deletedStatus.body == "Default")
                .Select(x => x.id);
            var replyCount = _db.Replies
                .Count(x => commentIds.Contains(x.commentId ?? -1) &&
                        x.deletedStatus.body == "Default");
            post.comRepLength = commentIds.Count() + replyCount;
            //elapsedTimeForExtras.Stop();

            //Get the sum of words in chapters of the post
            char[] wordSeparator = new char[] {' ', '\r', '\n' };
            var chbodyList = _db.Chapters
                .Where(x => x.postId == post.id &&
                        x.deletedStatus.body == "Default" &&
                        x.isPublished == true)
                .Select(x => x.body);
            foreach(string? chbody in chbodyList){
                post.wordsLength += chbody != null
                    ? chbody.Split(wordSeparator, StringSplitOptions.RemoveEmptyEntries).Length : 0;
            }

            //check vote by user
            if (userId != null)
            {
                Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                    v.accountId == userId &&
                    v.targetPostId == post.id);
                if (checkVoteByUser != null)
                    post.VotedByUser = checkVoteByUser.body;
            }
        }
        return Ok(new { posts = postList});
    }
}