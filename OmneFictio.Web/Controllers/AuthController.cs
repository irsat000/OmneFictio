using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OmneFictio.Web.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Net;

namespace OmneFictio.Web.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly HttpClient _httpClient;
    JwtSecurityTokenHandler _jwtHandler = new JwtSecurityTokenHandler();

    public AuthController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("of");
    }

    //fetch api manual login
    [HttpPost]
    public async Task<JsonResult> UserLogin([FromBody] AccountRead2 account)
    {
        bool rememberme = true;
        bool.TryParse(account.RememberMe, out rememberme);
        var apiResponse = await _httpClient.PostAsJsonAsync("Auth/Login", account);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode != "OK")
            return new JsonResult(NotFound());
        else
        {
            var dictResult = await getDictFromResponse(apiResponse);
            dictResult!.TryGetValue("jwt", out var newToken);
            CreateUserSession(newToken!, rememberme: rememberme);
            return new JsonResult(Ok());
        }
    }

    [HttpPost]
    public async Task<JsonResult> UserRegistration([FromBody] AccountWrite1 account)
    {
        account.AllowAdultContent = account.AllowAdultContent?.ToString() == "true"
            ? true : false;
        account.PrefLanguageId = int.TryParse((string?)account.PrefLanguageId, out int prefLan)
            ? prefLan : 0; //or null

        var apiResponse = await _httpClient.PostAsJsonAsync("Auth/Register", account);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode == "OK")
        {
            var dictResult = await getDictFromResponse(apiResponse);
            dictResult!.TryGetValue("jwt", out var newToken);
            CreateUserSession(newToken!);
            return new JsonResult(Ok());
        }
        else if (statusCode == "Accepted")
        {
            return new JsonResult(Accepted()); //created user but failed to get JWT
        }
        else if (statusCode == "Conflict")
        {
            return new JsonResult(Conflict()); //username exists
        }
        else
        {
            return new JsonResult(BadRequest()); //bad payload
        }
    }

    [HttpPost]
    public async Task<JsonResult> GoogleSignin([FromBody] AuthToken googleToken)
    {
        var apiResponse = await _httpClient.PostAsJsonAsync("Auth/Signin-External", googleToken.token);
        string statusCode = apiResponse.StatusCode.ToString();

        if (statusCode == "OK")
        {
            var dictResult = await getDictFromResponse(apiResponse);
            dictResult!.TryGetValue("jwt", out var newToken);
            dictResult!.TryGetValue("pic", out var pPicUrl);

            ClaimsPrincipal session = CreateUserSession(newToken!);
            string? permaPic = session.FindFirst("actort")!.Value ?? null;

            if (pPicUrl != null && permaPic != null &&
                !System.IO.File.Exists($"wwwroot/images/users/{permaPic}"))
            {
                var picRes = await _httpClient.GetAsync(pPicUrl);
                byte[] picBytes = await picRes.Content.ReadAsByteArrayAsync();
                await System.IO.File.WriteAllBytesAsync($"wwwroot/images/users/{permaPic}", picBytes);
            }

            return new JsonResult(Ok());
        }
        else if (statusCode == "BadRequest")
        {
            //Bad token
            return new JsonResult(BadRequest());
        }
        else
        {
            //Server error
            return new JsonResult(StatusCode(500));
        }
    }



    [HttpGet]
    public IActionResult LogOut()
    {
        //HttpContext.Session.Clear();
        HttpContext.SignOutAsync();
        HttpContext.Response.Cookies.Delete("UserAuth");
        return RedirectToAction("Index", "Home");
    }



    public async Task<Dictionary<string, string>> getDictFromResponse(HttpResponseMessage response)
    {
        string raw = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Dictionary<string, string>>(raw);
        return result!;
    }
    public ClaimsPrincipal CreateUserSession(string tokenRaw, bool rememberme = true)
    {
        //HttpContext.Session.Clear();
        HttpContext.SignOutAsync();

        JwtSecurityToken token = _jwtHandler.ReadJwtToken(tokenRaw);
        var principal = new ClaimsPrincipal(new ClaimsIdentity(token.Claims, CookieAuthenticationDefaults.AuthenticationScheme));

        var sessionSettings = new AuthenticationProperties
        {
            IsPersistent = true,
            ExpiresUtc = DateTime.UtcNow.AddMonths(1)
        };
        var coockieSettings = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddMonths(1)
        };
        if (rememberme == false)
        {
            sessionSettings.ExpiresUtc = DateTime.UtcNow.AddHours(4);
            coockieSettings.Expires = DateTime.UtcNow.AddHours(4);
        }
        HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, sessionSettings);
        HttpContext.Response.Cookies.Append("UserAuth", "True", coockieSettings);
        return principal;
    }
}
