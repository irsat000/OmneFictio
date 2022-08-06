using Microsoft.EntityFrameworkCore;
using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;
using OmneFictio.MinApi.Configurations;
using OmneFictio.MinApi.Stored;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BC = BCrypt.Net.BCrypt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OmneFictioContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

JsonSerializerOptions options = new(){
    ReferenceHandler = ReferenceHandler.Preserve,
    WriteIndented = true
};
JwtSecurityTokenHandler _jwtHandler = new JwtSecurityTokenHandler();
Random _random = new Random(); 

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();


var securityToken = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("Token").Value);
var mapper = app.Services.GetService<IMapper>();
if (mapper == null)
    throw new InvalidOperationException("Mapper not found");

app.MapGet("/", () =>
{
    return "Hello world";
});

app.MapGet("/posts", async (OmneFictioContext db) => {
    var posts = await mapper.ProjectTo<PostDtoRead_1>(db.Posts).ToListAsync();
    return posts;
});

app.MapPost("/login", async (OmneFictioContext db, AccountDtoRead_2 request) => {
    var user = mapper.Map<AccountDtoRead_3>(db.Accounts.SingleOrDefault(x => x.Username == request.Username));
    if (user == null || !BC.Verify(request.Pw, user.Pw))
        return Results.BadRequest("Login failed");
    var token = MyMethods.CreateUserToken(user, securityToken);
    return Results.Ok(new {token});
});

app.MapPost("/register", async (OmneFictioContext db, AccountDtoWrite_1 request) => {
    Regex usernameRegex = new Regex(@"[A-Za-z0-9_]{3,30}");
    if(!usernameRegex.IsMatch(request.Username) ||
        db.Accounts.Any(a => a.Username == request.Username))
        return Results.BadRequest("Registration failed");

    string passwordHash = BC.HashPassword(request.Pw);
    AccountDtoWrite_1 newAccount = new AccountDtoWrite_1();
    newAccount.Username = request.Username;
    newAccount.Pw = passwordHash;
    newAccount.Email = request.Email;
    newAccount.ExternalType = "native";
    if(request.AllowSexual != null)
        newAccount.AllowSexual = request.AllowSexual;
    if(request.AllowViolence != null)
        newAccount.AllowViolence = request.AllowViolence;
    if(db.Languages.Any(l => l.Id == request.PrefLanguageId))
        newAccount.PrefLanguageId = request.PrefLanguageId;
    db.Accounts.Add(mapper.Map<Account>(newAccount));
    await db.SaveChangesAsync();

    //token function call
    return Results.Ok();
});

app.MapPost("/register-external", async (OmneFictioContext db, [FromBody] string token) => {
    var jwt = _jwtHandler.ReadJwtToken(token);
    
    bool verified = bool.Parse(jwt.Claims.First(claim => claim.Type == "email_verified").Value);
    if(verified == false)
        return Results.BadRequest("1");
    var extid = jwt.Claims.First(claim => claim.Type == "sub").Value;
    
    if(!db.Accounts.Any(a => a.ExternalId == extid && a.ExternalType == "google")){
        var email = jwt.Claims.First(claim => claim.Type == "email").Value;
        var profilePic = jwt.Claims.First(claim => claim.Type == "picture").Value;
        var name = Regex.Replace(jwt.Claims.First(claim => claim.Type == "name").Value, @"\s+", "");
        var username = name;
        while(db.Accounts.Any(a => a.Username == username)){
            username = name + _random.Next(100, 1000).ToString();
        }
        
        string passwordHash = BC.HashPassword(GeneratePassword.Generate(16, 8));
        AccountDtoWrite_3 newAccount = new AccountDtoWrite_3();
        newAccount.Username = username;
        newAccount.Email = email;
        newAccount.ExternalId = extid;
        newAccount.ProfilePic = profilePic;
        newAccount.DisplayName = name;
        newAccount.Pw = passwordHash;
        newAccount.ExternalType = "google";
        newAccount.AllowSexual = true;
        newAccount.AllowViolence = true;
        newAccount.PrefLanguageId = null;
        db.Accounts.Add(mapper.Map<Account>(newAccount));
        await db.SaveChangesAsync();
    }

    return Results.Ok(new {extid});
});


app.Run();
