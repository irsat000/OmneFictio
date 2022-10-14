using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using OmneFictio.WebApi.Entities;

namespace OmneFictio.WebApi.Controllers;

public class HomeController : ControllerBase
{
    public HomeController()
    {

    }
}