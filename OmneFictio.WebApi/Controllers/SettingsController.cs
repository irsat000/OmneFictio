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
using Google.Apis.Auth;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using System.Diagnostics;

namespace OmneFictio.WebApi.Controllers;

[ApiController]
[Route("Settings")]
public class SettingsController : ControllerBase
{
    private readonly OmneFictioContext _db;
    private readonly IMapper _mapper;
    private readonly ILogger<ProfileController> _logger;
    private readonly IHelperServices _helperServices;

    public SettingsController(ILogger<ProfileController> logger, IMapper mapper, OmneFictioContext db, IHelperServices helperServices)
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

    [HttpGet("GetAccountInformation/{accountId}")]
    public async Task<IActionResult> AccountInformation(int accountId)
    {
        AccountDto_Settings? account = await _mapper
            .ProjectTo<AccountDto_Settings>(_db.Accounts.Where(a => a.id == accountId))
            .FirstOrDefaultAsync();
        if (account == null)
        {
            return NotFound();
            //logging
        }

        return Ok(new { account });
    }

    [HttpPost("UpdateAccountInformation")]
    public async Task<IActionResult> UpdateAccountInformation(Account_Update_Settings request)
    {
        Account? account = await _db.Accounts.FirstOrDefaultAsync(a => a.id == request.id);
        if (account == null)
        {
            return NotFound();
            //logging
        }
        
        if (request.displayName != null && request.displayName != account.displayName)
        {
            account.displayName = request.displayName;
        }
        if (request.selfDesc != null && request.selfDesc != account.selfDesc)
        {
            account.selfDesc = request.selfDesc;
        }
        if (request.profilePic != null)
        {
            account.profilePic = request.profilePic; // If profile pic is downloaded and uploaded to my storage
        }

        // _db.Accounts.Update(account);
        await _db.SaveChangesAsync();
        return Ok();
    }
}