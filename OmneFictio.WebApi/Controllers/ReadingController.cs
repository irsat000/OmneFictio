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
[Route("Read")]
public class ReadingController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ReadingController> _logger;

    public ReadingController(ILogger<ReadingController> logger, IMapper mapper, OmneFictioContext db)
    {
        _logger = logger;
        _mapper = mapper;
        if (_mapper == null)
        {
            throw new InvalidOperationException("Mapper not found");
        }
        _db = db;
    }

    [HttpGet("GetChapter/{postid}/{chapterindex}/{userId?}")]
    public async Task<IActionResult> GetChapter(int postid, int chapterindex, int? userId)
    {
        var chapter = await _mapper.ProjectTo<ChapterDtoRead_2>(_db.Chapters.Where(c =>
            c.postId == postid &&
            c.chapterIndex == chapterindex &&
            c.isPublished == true &&
            c.deletedStatus!.body == "Default")).FirstOrDefaultAsync();

        if (chapter == null)
        {
            return NotFound();
        }
        if (chapter.post != null && chapter.post.chapters != null && chapter.post.chapters.Count() > 0)
        {
            chapter.post.chapters = chapter.post.chapters.Where(c => c.IsPublished == true).ToList();
        }
        //check vote by user
        if (userId != null)
        {
            Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                v.accountId == userId &&
                v.targetChapterId == chapter.id);
            if (checkVoteByUser != null)
                chapter.VotedByUser = checkVoteByUser.body;
        }
        return Ok(chapter);
    }

    [HttpGet("GetPost/{postid}/{userId?}")]
    public async Task<IActionResult> GetPost(int postid, int? userId)
    {
        var post = await _mapper.ProjectTo<PostDtoRead_1>(_db.Posts.Where(p =>
            p.isPublished == true &&
            p.deletedStatus!.body == "Default" &&
            p.id == postid)).FirstOrDefaultAsync();
        if (post == null)
        {
            return NotFound();
        }
        if (post.chapters != null && post.chapters.Count() > 0)
        {
            post.chapters = post.chapters.Where(c => c.IsPublished == true).ToList();
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
                p.deletedStatus!.body == "Default")
            .OrderByDescending(p => p.publishDate);
        //More filters
        //-----------
        //get page count
        int pageCount = (posts.Count() + ppp - 1) / ppp;
        //limit to page
        var posts_onepage = await _mapper.ProjectTo<PostDtoRead_1>(posts)
            .Skip(ppp * (page - 1))
            .Take(ppp)
            .ToListAsync();
        //Return
        if (posts_onepage == null || posts_onepage.Count() < 1)
        {
            return NotFound();
        }
        foreach (PostDtoRead_1 post in posts_onepage)
        {
            if (post.chapters != null && post.chapters.Count() > 0)
                post.chapters = post.chapters.Where(c => c.IsPublished == true).ToList();
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
        return Ok(new { posts = posts_onepage, pages = pageCount });
    }

    [HttpGet("GetComments/{type}/{parentid}/{userId?}")]
    public async Task<IActionResult> GetComments(string type, int parentid, int? userId)
    {
        List<CommentDtoRead_2> comments = new List<CommentDtoRead_2>();

        if (type == "post")
        {
            comments = await _mapper.ProjectTo<CommentDtoRead_2>(_db.Comments.Where(c =>
                c.targetPostId == parentid &&
                c.deletedStatus!.body == "Default")
                .OrderByDescending(c => c.publishDate)).ToListAsync();
        }
        else if (type == "chapter")
        {
            comments = await _mapper.ProjectTo<CommentDtoRead_2>(_db.Comments.Where(c =>
                c.targetChapterId == parentid &&
                c.deletedStatus!.body == "Default")
                .OrderByDescending(c => c.publishDate)).ToListAsync();
        }

        if (comments == null || comments.Count() == 0)
        {
            return NotFound();
        }
        //check vote by user
        if (userId != null)
        {
            foreach (var x in comments)
            {
                Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                    v.accountId == userId &&
                    v.targetCommentId == x.Id);
                if (checkVoteByUser != null)
                    x.VotedByUser = checkVoteByUser.body;
            }
        }
        return Ok(comments);
    }

    [HttpGet("GetHighlightedReply/{commentid}/{userId?}")]
    public async Task<IActionResult> GetHighlightedReply(int commentid, int? userId)
    {
        //Get the comment's replies
        var replies = await _mapper.ProjectTo<ReplyDtoRead_2>(_db.Replies.Where(r =>
            r.commentId == commentid)).ToListAsync();
        //get highlighted
        ReplyDtoRead_2? hReply =
                    replies.OrderByDescending(r => r.VoteResult)
                        .ThenBy(r => r.PublishDate).FirstOrDefault();

        if (hReply == null)
        {
            return NotFound();
        }
        //check vote by user
        if (userId != null)
        {
            Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                v.accountId == userId &&
                v.targetReplyId == hReply.Id);
            if (checkVoteByUser != null)
                hReply.VotedByUser = checkVoteByUser.body;
        }
        return Ok(hReply);
    }

    [HttpGet("GetComment/{commentid}/{userId?}")]
    public async Task<IActionResult> GetComment(int commentid, int? userId)
    {
        var comment = await _mapper.ProjectTo<CommentDtoRead_3>(_db.Comments.Where(c =>
        c.id == commentid)).FirstOrDefaultAsync();
        //checking integrity
        if (comment == null)
        {
            return NotFound();
        }
        else if (comment.DeletedStatus!.Body != "Default")
        {
            return Unauthorized();
        }
        if (comment.Replies == null || comment.Replies.Count() < 1)
        {
            return NotFound();
        }
        //filtering deleted replies
        comment.Replies = comment.Replies
            .Where(r => r.DeletedStatus!.Body == "Default")
            .OrderBy(r => r.PublishDate).ToList();
        //check vote by user
        if (userId != null)
        {
            Vote? checkVoteByUser_c = await _db.Votes.SingleOrDefaultAsync(v =>
                v.accountId == userId &&
                v.targetCommentId == comment.Id);
            if (checkVoteByUser_c != null)
                comment.VotedByUser = checkVoteByUser_c.body;

            foreach (var x in comment.Replies)
            {
                Vote? checkVoteByUser_r = await _db.Votes.SingleOrDefaultAsync(v =>
                    v.accountId == userId &&
                    v.targetReplyId == x.Id);
                if (checkVoteByUser_r != null)
                    x.VotedByUser = checkVoteByUser_r.body;
            }
        }
        return Ok(comment);
    }

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

    [HttpGet("CheckRateByUser/{Postid}/{AccountId}")]
    public async Task<IActionResult> CheckRateByUser(int Postid, int AccountId)
    {
        Rate? rate = await _db.Rates.FirstOrDefaultAsync(r =>
            r.postId == Postid &&
            r.accountId == AccountId);
        if (rate == null)
        {
            return NotFound();
        }
        return Ok(rate.body);
    }
}
