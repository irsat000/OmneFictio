using OmneFictio.WebApi.Entities;
using OmneFictio.WebApi.Dtos;
using OmneFictio.WebApi.Models;
using OmneFictio.WebApi.Configurations;
using OmneFictio.WebApi.Infrastructure;
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
    private readonly IHelperServices _helperServices;

    public ProfileController(ILogger<ProfileController> logger, IMapper mapper, OmneFictioContext db, IHelperServices helperServices)
    {
        _logger = logger;
        _mapper = mapper;
        if (_mapper == null)
        {
            throw new InvalidOperationException("Mapper not found");
        }
        _db = db;
        _helperServices = helperServices;
    }

    [HttpGet("GetProfileDetails/{targetUsername}/{userId?}")]
    public async Task<IActionResult> ProfileDetails
        (string targetUsername, int? userId)
    {
        var account = await _mapper.ProjectTo<AccountDtoRead_3>(_db.Accounts
            .Where(a =>
                a.username == targetUsername &&
                a.deletedStatus != null &&
                a.deletedStatus.body == "Default"
            )).FirstOrDefaultAsync();
        if (account == null)
        {
            return NotFound();
        }
        //Check if it's someone else's profile
        if (userId != null && userId == account.id)
        {
            account.ownProfile = true;
        }
        else
        {
            account.ownProfile = false;
            account.email = null;
            account.emailValid = null;
            account.gold = null;
        }
        account.isNSFW = true;

        //Get the user's posts for other calculations
        var postsPublished = _db.Posts
            .Where(p => p.accountId == account.id &&
                p.deletedStatus != null &&
                p.deletedStatus.body == "Default")
            .Select(p => p.id).ToList();


        //Get stat_postsPublished
        account.stat_postsPublished = postsPublished.Count();
        //Get stat_likes
        int likesSum = _db.Votes
            .Where(v => v.targetPostId != null && postsPublished.Contains((int)v.targetPostId) && v.body == true)
            .Sum(v => 1);
        int dislikesSum = _db.Votes
            .Where(v => v.targetPostId != null && postsPublished.Contains((int)v.targetPostId) && v.body == false)
            .Sum(v => 1);
        account.stat_likes = likesSum - dislikesSum;
        //Get stat_saved
        account.stat_saved = _db.SavedPosts
            .Count(sp => postsPublished.Contains(sp.targetPostId));

        return Ok(new { accountInfo = account });
    }

    [HttpGet("GetPosts/{targetUsername}/{userId?}")]
    public async Task<IActionResult> GetPosts
        (string targetUsername, int? userId)
    {
        //Get the user's posts
        var posts = await _mapper.ProjectTo<PostDtoRead_1>(_db.Posts
            .Where(p =>
                p.isPublished == true &&
                p.deletedStatus != null &&
                p.deletedStatus.body == "Default" &&
                p.account != null &&
                p.account.username == targetUsername)
            .OrderByDescending(p => p.publishDate))
            .ToListAsync();
        if (posts.Count() == 0)
        {
            return NotFound();
        }

        try
        {
            posts = await _helperServices.GetPosts_Details(posts, userId);
            return Ok(new { posts = posts });
        }
        catch (System.Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet("GetReviews/{targetUsername}/{userId?}")]
    public async Task<IActionResult> GetReviews
        (string targetUsername, int? userId)
    {
        var comments = await _mapper.ProjectTo<CommentDtoRead_2>(_db.Comments.Where(c =>
                c.targetPostId != null &&
                c.deletedStatus != null &&
                c.deletedStatus.body == "Default" &&
                c.account != null &&
                c.account.username == targetUsername)
            .OrderByDescending(c => c.publishDate)).ToListAsync();
        if (comments.Count() == 0)
        {
            return NotFound();
        }
        try
        {
            comments = await _helperServices.GetComments_Details(comments, userId);
            return Ok(comments);
        }
        catch (System.Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet("GetSavedPosts/{targetUsername}/{userId?}")]
    public async Task<IActionResult> GetSavedPosts
        (string targetUsername, int? userId)
    {
        //Get the user's posts
        List<int> savedPostIds = await _db.SavedPosts
                .Where(a => a.account.username == targetUsername)
                .OrderByDescending(a => a.saveDate)
                .Select(x => x.targetPostId)
                .ToListAsync();
        if (savedPostIds.Count() == 0)
        {
            return NotFound();
        }

        var posts = await _mapper.ProjectTo<PostDtoRead_1>(_db.Posts
            .Where(p =>
                p.isPublished == true &&
                p.deletedStatus != null &&
                p.deletedStatus.body == "Default" &&
                savedPostIds.Contains(p.id)))
            .ToListAsync();
        if (posts.Count() == 0)
        {
            return NotFound();
        }

        try
        {
            posts = posts.OrderBy(p => savedPostIds.IndexOf(p.id)).ToList();
            posts = await _helperServices.GetPosts_Details(posts, userId);
            return Ok(new { posts = posts });
        }
        catch (System.Exception)
        {
            return BadRequest();
        }
    }
}