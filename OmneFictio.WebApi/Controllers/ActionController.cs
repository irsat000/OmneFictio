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
}
