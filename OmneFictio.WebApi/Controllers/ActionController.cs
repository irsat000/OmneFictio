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
[Route("Action")]
public class ActionController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ReadingController> _logger;

    public ActionController(ILogger<ReadingController> logger, IMapper mapper, OmneFictioContext db)
    {
        _logger = logger;
        _mapper = mapper;
        if (_mapper == null)
        {
            throw new InvalidOperationException("Mapper not found");
        }
        _db = db;
    }

    [HttpPost("Vote")]
    public async Task<IActionResult> Vote(VoteDtoWrite_1 request)
    {
        //checks if it's already voted
        Vote? checkVote = null;
        switch (request.targetType)
        {
            case "post":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.accountId &&
                    x.targetPostId == request.targetId); break;
            case "chapter":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.accountId &&
                    x.targetChapterId == request.targetId); break;
            case "comment":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.accountId &&
                    x.targetCommentId == request.targetId); break;
            case "reply":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.accountId &&
                    x.targetReplyId == request.targetId); break;
            default:
                return BadRequest();
        }

        //it's already voted and it's the opposite value
        if (checkVote != null && checkVote.body != request.body)
        {
            _db.Votes.Remove(_db.Votes.SingleOrDefault(x => x.id == checkVote.id)!);
        }
        //if user clicks on the same button to take their vote back
        //else, votes the post normally
        if (checkVote != null && checkVote.body == request.body)
        {
            _db.Votes.Remove(_db.Votes.SingleOrDefault(x => x.id == checkVote.id)!);
        }
        else
        {
            Vote newVote = new Vote
            {
                accountId = request.accountId,
                body = request.body
            };

            switch (request.targetType)
            {
                case "post": newVote.targetPostId = request.targetId; break;
                case "chapter": newVote.targetChapterId = request.targetId; break;
                case "comment": newVote.targetCommentId = request.targetId; break;
                case "reply": newVote.targetReplyId = request.targetId; break;
            }
            await _db.Votes.AddAsync(newVote);
        }

        try
        {
            await _db.SaveChangesAsync();
        }
        catch (Exception)
        {
            return BadRequest();
        }
        return Ok();
    }

    [HttpPost("Rate")]
    public async Task<IActionResult> Rate(RateInfo request)
    {
        if (!(request.rateValue >= 0 && request.rateValue <= 10))
        {
            return BadRequest();
        }
        //check existing rate and replace if it exists
        Rate? rate = await _db.Rates.FirstOrDefaultAsync(x =>
            x.accountId == request.accountId &&
            x.postId == request.postId);
        if (rate != null)
        {
            _db.Rates.Remove(rate);
        }

        if (request.rateValue != 0)
        {
            //create new rate
            rate = new Rate
            {
                accountId = request.accountId,
                postId = request.postId,
                body = request.rateValue
            };
            await _db.Rates.AddAsync(rate);
        }
        try
        {
            await _db.SaveChangesAsync();
        }
        catch (Exception)
        {
            return BadRequest();
        }
        return Ok();
    }

    [HttpPost("SavePost")]
    public async Task<IActionResult> SavePost(SavedPostDtoWrite request)
    {
        if (await _db.Posts.AnyAsync(p => p.id == request.targetPostId) == false ||
            await _db.Accounts.AnyAsync(a => a.id == request.accountId) == false)
        {
            return NotFound();
        }
        SavedPost? savedPost = await _db.SavedPosts.FirstOrDefaultAsync(s =>
            s.accountId == request.accountId &&
            s.targetPostId == request.targetPostId);
        try
        {
            if (savedPost != null)
            {
                _db.SavedPosts.Remove(savedPost);
                await _db.SaveChangesAsync();
                return Accepted();
            }
            savedPost = new SavedPost
            {
                accountId = request.accountId,
                targetPostId = request.targetPostId,
                saveDate = DateTime.Now
            };
            await _db.SavedPosts.AddAsync(savedPost);
            await _db.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPost("AddComment")]
    public async Task<IActionResult> AddComment(CommentDtoWrite_1 request)
    {
        Comment? newComment = new Comment
        {
            accountId = request.accountId,
            deletedStatusId = 1, // Default  //Might try -> _db.DeletedStatuses.FirstOrDefault(d => d.body == "Default")
            publishDate = DateTime.Now,
            updateDate = DateTime.Now
        };

        if (request.targetPostId != null && request.targetPostId != 0)
            newComment.targetPostId = request.targetPostId;
        else if (request.targetChapterId != null && request.targetChapterId != 0)
            newComment.targetChapterId = request.targetChapterId;
        else
            return BadRequest();

        if (request.body != null &&
            request.body.Length > 0 &&
            String.IsNullOrWhiteSpace(request.body) == false)
        {
            newComment.body = request.body;
        }

        try
        {
            await _db.Comments.AddAsync(newComment);
            await _db.SaveChangesAsync();
            CommentDtoRead_2? returnComment = await _mapper.ProjectTo<CommentDtoRead_2>
                    (_db.Comments.Where(p => p.id == newComment.id))
                .FirstOrDefaultAsync();
            return Ok(new { returnComment });
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPost("CreatePost")]
    public async Task<IActionResult> CreatePost(PostDtoWrite_1 request)
    {
        if (request.title == null ||
            request.title.Length > 250 || request.title.Length == 0 ||
            request.postDescription == null ||
            request.postDescription.Length > 2000 || request.postDescription.Length < 10)
        {
            return BadRequest();
        }

        Post newpost = new Post();
        newpost.title = request.title;
        newpost.postDescription = request.postDescription;
        newpost.accountId = request.accountId;
        newpost.languageId = request.languageId;
        newpost.postTypeId = request.postTypeId;
        newpost.ratedAsId = request.ratedAsId;
        newpost.coverImage = request.coverImage;
        newpost.publishDate = DateTime.Now;
        newpost.updateDate = DateTime.Now;
        newpost.deletedStatusId = 1; // Default
        newpost.postStatusId = 1; // In-Progress
        newpost.isPublished = true; // <- User will decide when creating
        if (request.tagList != null)
        {
            foreach (int tagid in request.tagList)
            {
                Tag? tag = await _db.Tags.FirstOrDefaultAsync(s => s.id == tagid);
                if (tag != null)
                {
                    newpost.tags.Add(tag);
                }
            }
        }
        if (request.postTypeId == 3 && request.seriesList != null)
        {
            foreach (int seriesid in request.seriesList)
            {
                ExistingStory? series = await _db.ExistingStories.FirstOrDefaultAsync(s => s.id == seriesid);
                if (series != null)
                {
                    newpost.existingStories.Add(series);
                }
            }
        }
        if (request.postTypeId == 3 && newpost.existingStories.Count < 1)
        {
            return BadRequest(); //Fanfiction is chosen but there is no reference to stories
        }

        try
        {
            await _db.Posts.AddAsync(newpost);
            await _db.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
