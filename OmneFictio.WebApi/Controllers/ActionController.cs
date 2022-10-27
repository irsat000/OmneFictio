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
        switch (request.TargetType)
        {
            case "post":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.AccountId &&
                    x.targetPostId == request.TargetId); break;
            case "chapter":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.AccountId &&
                    x.targetChapterId == request.TargetId); break;
            case "comment":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.AccountId &&
                    x.targetCommentId == request.TargetId); break;
            case "reply":
                checkVote = await _db.Votes.FirstOrDefaultAsync(x => x.accountId == request.AccountId &&
                    x.targetReplyId == request.TargetId); break;
            default:
                return BadRequest();
        }

        //it's already voted and it's the opposite value
        if (checkVote != null && checkVote.body != request.Body)
        {
            _db.Votes.Remove(_db.Votes.SingleOrDefault(x => x.id == checkVote.id)!);
        }
        //if user clicks on the same button to take their vote back
        //else, votes the post normally
        if (checkVote != null && checkVote.body == request.Body)
        {
            _db.Votes.Remove(_db.Votes.SingleOrDefault(x => x.id == checkVote.id)!);
        }
        else
        {
            Vote newVote = new Vote
            {
                accountId = request.AccountId,
                body = request.Body
            };

            switch (request.TargetType)
            {
                case "post": newVote.targetPostId = request.TargetId; break;
                case "chapter": newVote.targetChapterId = request.TargetId; break;
                case "comment": newVote.targetCommentId = request.TargetId; break;
                case "reply": newVote.targetReplyId = request.TargetId; break;
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
        if (!(request.RateValue >= 0 && request.RateValue <= 10))
        {
            return BadRequest();
        }
        //check existing rate and replace if it exists
        Rate? rate = await _db.Rates.FirstOrDefaultAsync(x =>
            x.accountId == request.AccountId &&
            x.postId == request.PostId);
        if (rate != null)
        {
            _db.Rates.Remove(_db.Rates.SingleOrDefault(x => x.id == rate.id)!);
        }
        
        if (request.RateValue != 0)
        {
            //create new rate
            rate = new Rate
            {
                accountId = request.AccountId,
                postId = request.PostId,
                body = request.RateValue
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

    [HttpPost("AddComment")]
    public async Task<IActionResult> AddComment(CommentDtoWrite_1 request)
    {
        Comment? newComment = new Comment
        {
            accountId = request.AccountId,
            deletedStatusId = 1,
            publishDate = DateTime.Now,
            updateDate = DateTime.Now
        };

        if (request.TargetPostId != null && request.TargetPostId != 0)
            newComment.targetPostId = request.TargetPostId;
        else if (request.TargetChapterId != null && request.TargetChapterId != 0)
            newComment.targetChapterId = request.TargetChapterId;
        else
            return BadRequest();

        if (request.Body != null &&
            request.Body.Length > 0 &&
            String.IsNullOrWhiteSpace(request.Body) == false)
        {
            newComment.body = request.Body;
        }

        try
        {
            await _db.Comments.AddAsync(newComment);
            await _db.SaveChangesAsync();
        }
        catch (Exception)
        {
            return BadRequest();
        }
        CommentDtoRead_2? returnComment =
            await _mapper.ProjectTo<CommentDtoRead_2>
            (_db.Comments.Where(p => p.id == newComment.id))
            .FirstOrDefaultAsync();
        return Ok(new { returnComment });
    }

    [HttpPost("CreatePost")]
    public async Task<IActionResult> CreatePost(PostDtoWrite_1 request)
    {
        if (request.Title == null ||
            request.Title.Length > 250 || request.Title.Length == 0 ||
            request.PostDescription == null ||
            request.PostDescription.Length > 2000 || request.PostDescription.Length < 10)
        {
            return BadRequest();
        }

        Post newpost = new Post();
        newpost.title = request.Title;
        newpost.postDescription = request.PostDescription;
        newpost.languageId = request.LanguageId;
        newpost.accountId = request.AccountId;
        newpost.postTypeId = request.PostTypeId;
        newpost.ratedAsId = request.RatedAsId;
        newpost.coverImage = request.CoverImage;
        newpost.publishDate = DateTime.Now;
        newpost.updateDate = DateTime.Now;
        newpost.deletedStatusId = 1;
        newpost.postStatusId = 1;
        newpost.isPublished = true;
        if (request.TagList != null)
        {
            foreach (int tagid in request.TagList)
            {
                Tag? tag = await _db.Tags.FirstOrDefaultAsync(s => s.id == tagid);
                if (tag != null)
                {
                    newpost.tags.Add(tag);
                }
            }
        }
        if (request.PostTypeId == 3 && request.SeriesList != null)
        {
            foreach (int seriesid in request.SeriesList)
            {
                ExistingStory? series = await _db.ExistingStories.FirstOrDefaultAsync(s => s.id == seriesid);
                if (series != null)
                {
                    newpost.existingStories.Add(series);
                }
            }
        }
        if (request.PostTypeId == 3 && newpost.existingStories.Count < 1)
        {
            return BadRequest(); //Fanfiction is chosen but there is no reference to stories
        }

        try
        {
            await _db.Posts.AddAsync(newpost);
            await _db.SaveChangesAsync();
        }
        catch (Exception)
        {
            return BadRequest();
        }

        return Ok();
    }
}
