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

    [HttpGet("AccountInformation/{accountId}")]
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
}