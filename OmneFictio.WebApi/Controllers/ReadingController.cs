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
using AutoMapper.QueryableExtensions;
using BC = BCrypt.Net.BCrypt;
using System.Data.Entity.Validation;
using Google.Apis.Auth;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using System.Diagnostics;

namespace OmneFictio.WebApi.Controllers;

[ApiController]
[Route("Read")]
public class ReadingController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ReadingController> _logger;
    private readonly IHelperServices _helperServices;

    public ReadingController(ILogger<ReadingController> logger, IMapper mapper, OmneFictioContext db, IHelperServices helperServices)
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

    [HttpGet("GetChapter/{postid}/{chapterindex}/{userId?}")]
    public async Task<IActionResult> GetChapter(int postid, int chapterindex, int? userId)
    {
        var chapter = await _mapper.ProjectTo<ChapterDtoRead_2>(_db.Chapters.Where(c =>
            c.postId == postid &&
            c.chapterIndex == chapterindex &&
            c.isPublished == true &&
            c.deletedStatus != null &&
            c.deletedStatus.body == "Default")).FirstOrDefaultAsync();

        if (chapter == null)
        {
            return NotFound();
        }
        if (chapter.post.Chapters != null && chapter.post.Chapters.Count() > 0)
        {
            chapter.post.Chapters = chapter.post.Chapters.Where(c => c.isPublished == true).ToList();
        }
        //Get votes
        chapter.voteResult = _db.Votes
            .Where(v => v.targetChapterId == chapter.id)
            .Sum(v => v.body == true ? 1 : -1);
        //check vote by user
        if (userId != null)
        {
            Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                v.accountId == userId &&
                v.targetChapterId == chapter.id);
            if (checkVoteByUser != null)
                chapter.votedByUser = checkVoteByUser.body;
        }
        return Ok(chapter);
    }

    [HttpGet("GetPost/{postid}/{userId?}")]
    public async Task<IActionResult> GetPost(int postid, int? userId)
    {
        var post = await _db.Posts.Where(p =>
                p.isPublished == true &&
                p.deletedStatus != null &&
                p.deletedStatus.body == "Default" &&
                p.id == postid)
            .ProjectTo<PostDtoRead_1>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        if (post == null)
        {
            return NotFound();
        }
        //check properties by user
        if (userId != null)
        {
            Rate? checkRateByUser = await _db.Rates.FirstOrDefaultAsync(r =>
                r.accountId == userId &&
                r.postId == post.id);
            if (checkRateByUser != null)
                post.ratedByUser = System.Math.Round(checkRateByUser.body, 1);

            post.savedByUser = await _db.SavedPosts.AnyAsync(s =>
                s.accountId == userId &&
                s.targetPostId == post.id);
        }
        post = await _helperServices.GetPosts_Details(post, userId);
        return Ok(post);
    }

    [HttpGet("GetPosts/{userId?}")]
    public async Task<IActionResult> GetPosts
        (int? userId, int page = 1, int ppp = 20)
    {
        //Check filters
        if (page < 1 || ppp < 1)
        {
            return BadRequest();
        }
        //Get with filters
        var posts = _db.Posts
            .Where(p =>
                p.isPublished == true &&
                p.deletedStatus != null &&
                p.deletedStatus.body == "Default")
            .OrderByDescending(p => p.publishDate);
        //More filters
        //-----------
        //get page count
        int pageCount = (posts.Count() + ppp - 1) / ppp;
        //post per page
        var posts_onepage = await _mapper.ProjectTo<PostDtoRead_1>(posts)
            .Skip(ppp * (page - 1))
            .Take(ppp)
            .ToListAsync();
        //Return
        if (posts_onepage == null || posts_onepage.Count() < 1)
        {
            return NotFound();
        }
        posts_onepage = await _helperServices.GetPosts_Details(posts_onepage, userId);

        return Ok(new { posts = posts_onepage, pages = pageCount });
    }

    [HttpGet("GetComments/{type}/{parentid}/{userId?}")]
    public async Task<IActionResult> GetComments(string type, int parentid, int? userId)
    {
        var comments = await _mapper.ProjectTo<CommentDtoRead_2>(_db.Comments.Where(c =>
                (c.targetPostId == parentid && type == "post" ||
                c.targetChapterId == parentid && type == "chapter") &&
                c.deletedStatus != null &&
                c.deletedStatus.body == "Default")
                .OrderByDescending(c => c.publishDate)).ToListAsync();
        if (comments.Count() == 0)
        {
            return NotFound();
        }
        comments = await _helperServices.GetComments_Details(comments, userId, true);
        return Ok(comments);
    }
    
    [HttpGet("GetComment/{commentid}/{userId?}")]
    public async Task<IActionResult> GetComment(int commentid, int? userId)
    {
        var comment = await _mapper.ProjectTo<CommentDtoRead_2>(_db.Comments.Where(c =>
                c.id == commentid &&
                c.deletedStatus != null &&
                c.deletedStatus.body == "Default"
            )).FirstOrDefaultAsync();
        //checking integrity
        if (comment == null)
        {
            return NotFound();
        }
        comment = await _helperServices.GetComments_Details(comment, userId, false);

        var replies = await _mapper.ProjectTo<ReplyDtoRead_2>(_db.Replies
            .Where(r => r.deletedStatus != null &&
                r.deletedStatus.body == "Default" &&
                r.commentId == comment.id)
            .OrderBy(r => r.publishDate))
            .ToListAsync();
        foreach (var reply in replies)
        {
            //Get votes
            reply.voteResult = _db.Votes
                .Where(v => v.targetReplyId == reply.id)
                .Sum(v => v.body == true ? 1 : -1);
            //Check vote by logged in user
            if (userId != null)
            {
                Vote? checkVoteByUser_r = await _db.Votes.SingleOrDefaultAsync(v =>
                    v.accountId == userId &&
                    v.targetReplyId == reply.id);
                reply.votedByUser = checkVoteByUser_r?.body;
            }
        }
        return Ok(new { comment = comment, replies = replies });
    }

    [HttpGet("GetTopPosts/{userId?}")]
    public async Task<IActionResult> GetTopPosts(int? userId)
    {
        async Task<List<PostDtoRead_1>> GetTopPosts(int days)
        {
            return await _db.Posts
                .Where(p =>
                    p.isPublished == true &&
                    p.deletedStatus != null &&
                    p.deletedStatus.body == "Default" &&
                    p.publishDate > DateTime.Now.AddDays(days))
                .OrderByDescending(v => v.Votes.Sum(v => v.body == true ? 1 : -1))
                .Take(4)
                .ProjectTo<PostDtoRead_1>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
        var todaysTopPosts = await GetTopPosts(-1);
        var monthsTopPosts = await GetTopPosts(-30);

        //Return
        todaysTopPosts = await _helperServices.GetPosts_Details(todaysTopPosts, userId);
        monthsTopPosts = await _helperServices.GetPosts_Details(monthsTopPosts, userId);
        return Ok(new { todaysTopPosts = todaysTopPosts, monthsTopPosts = monthsTopPosts });
    }


    /*
    OUTDATED. But I might use this for special occasions.
        [HttpGet("CheckVoteByUser")]
        public async Task<IActionResult> CheckVoteByUser(int AccountId, int TargetId, string TargetType)
        {
            Vote? vote = new Vote();
            switch (TargetType)
            {
                case "post":
                    vote = await _db.Votes.FirstOrDefaultAsync(v =>
                    v.accountId == AccountId && v.targetPostId == TargetId);
                    break;
                case "comment":
                    vote = await _db.Votes.FirstOrDefaultAsync(v =>
                    v.accountId == AccountId && v.targetCommentId == TargetId);
                    break;
                case "reply":
                    vote = await _db.Votes.FirstOrDefaultAsync(v =>
                    v.accountId == AccountId && v.targetReplyId == TargetId);
                    break;
                case "chapter":
                    vote = await _db.Votes.FirstOrDefaultAsync(v =>
                    v.accountId == AccountId && v.targetChapterId == TargetId);
                    break;
            }
            if (vote == null)
            {
                return NotFound();
            }
            return Ok(vote.body);
        }
    */



}
