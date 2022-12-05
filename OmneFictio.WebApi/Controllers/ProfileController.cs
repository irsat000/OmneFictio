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

    [HttpGet("GetPosts/{targetUsername}/{userId?}")]
    public async Task<IActionResult> GetPosts
        (string targetUsername, int? userId)
    {
        //Get the user's posts
        var posts = _db.Posts
            .Where(p =>
                p.isPublished == true &&
                p.deletedStatus!.body == "Default" &&
                p.account!.username == targetUsername)
            .OrderByDescending(p => p.publishDate);
        //-----------
        var postList = await _mapper.ProjectTo<PostDtoRead_1>(posts)
            .ToListAsync();

        postList = await _helperServices.GetPosts_Details(postList, userId);
        return Ok(new { posts = postList});
    }
}