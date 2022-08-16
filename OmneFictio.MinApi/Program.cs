using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;
using OmneFictio.MinApi.Configurations;
using OmneFictio.MinApi.Stored;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
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
MyMethods _myMethods = new MyMethods();

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
    //Authentication
    var checkUser = mapper.Map<AccountDtoRead_3>(db.Accounts.SingleOrDefault(x => x.Username == request.Username));
    if (checkUser == null || !BC.Verify(request.Pw, checkUser.Pw))
        return Results.NotFound("User not found");
    //Login
    var user = mapper.Map<AccountDtoRead_4>(db.Accounts.SingleOrDefault(x => x.Username == request.Username));
    var createToken = _myMethods.CreateUserToken(user, securityToken);
    if(createToken != null)
        return Results.Ok(new {jwt=createToken});
    else
        return Results.StatusCode(580);
});

app.MapPost("/register", async (OmneFictioContext db, AccountDtoWrite_1 request) => {
    //Input validation
    Regex usernameRegex = new Regex(@"[A-Za-z0-9_]{3,30}");
    if(!usernameRegex.IsMatch(request.Username))
        return Results.StatusCode(480);
    if(db.Accounts.Any(a => a.Username == request.Username))
        return Results.StatusCode(481);
    if(request.Pw!.Contains(" ") || request.Pw!.Length < 6)
        return Results.StatusCode(482);
    //Fill an account object
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
    //Save user in the database
    try {
        db.Accounts.Add(mapper.Map<Account>(newAccount));
        await db.SaveChangesAsync();
    } catch (Exception) {
        return Results.StatusCode(483);
    }
    //Login
    var user = mapper.Map<AccountDtoRead_4>(db.Accounts.SingleOrDefault(x => x.Username == request.Username));
    if (user == null)
        return Results.Ok();
    var createToken = _myMethods.CreateUserToken(user, securityToken);
    return Results.Ok(new {jwt=createToken});
});

app.MapPost("/signin-external", async (OmneFictioContext db, [FromBody] string token) => {
    //Validate token
        //string damagedpayload = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjAwNzE3MDcsImF1ZCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwODY4OTk5NTAyNjA3OTQ0OTk4MiIsImVtYWlsIjoiaXJzYXQwMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJpcsWfYXQgYkZW5peiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUZkWnVjcjkwMXpIcXRidU1BZXZlSlg2Q1JzemQ3dmw0eW83a3pmWW9UMUh3Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJpcsWfYXQiLCJmYW1pbHlfbmFtZSI6ImFrZGVuaXoiLCJpYXQiOjE2NjAwNzIwMDcsImV4cCI6MTY2MDA3NTYwNywianRpIjoiY2Q2NWM3Y2UyNjZlZjBhN2JmMGE1MjA4NmU4ZTQ4YmE3YTQ1ZWM5NiJ9.dKz7pzPK8rIVXglhIe14OzijmZrgc7kVhfXDFX228CRbt1go3aCvuywaoMr_UWm4AO0gX4uII_lqIuDSZzSuzJ4yGEkSTfhqI2WRKqf1AUqSYfPTIAGTkx9_MgNoCRryQoRDtK5RHuqYpOWTFcmHRoKEtxtEaEl_fEUdyM5pquR44KV27ohsQdOQet1-cPUsDUDPIefzNpzS2DAR0QFHTr4YYrfvPRY95tY1m62Hwj3BkE_EF35Ks_lELshEfjfuE7w-GAVD7o88RzMlvPLEl6m82q65v76-0zPF5ZDOQJFdkP6thHhS69R44WpyRYDJU_PrJ05NcZcbDsSRlVq_Tg";
        //string damagedsignature = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjAwNzE3MDcsImF1ZCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwODY4OTk5NTAyNjA3OTQ0OTk4MiIsImVtYWlsIjoiaXJzYXQwMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJpcsWfYXQgYWtkZW5peiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUZkWnVjcjkwMXpIcXRidU1BZXZlSlg2Q1JzemQ3dmw0eW83a3pmWW9UMUh3Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJpcsWfYXQiLCJmYW1pbHlfbmFtZSI6ImFrZGVuaXoiLCJpYXQiOjE2NjAwNzIwMDcsImV4cCI6MTY2MDA3NTYwNywianRpIjoiY2Q2NWM3Y2UyNjZlZjBhN2JmMGE1MjA4NmU4ZTQ4YmE3YTQ1ZWM5NiJ9.dKz7pzPK8rIVXglhIe14OzijmZrgc7kVhfXDFX228CRbt1go3aCvuywaoMr_UWm4AO0gX4uII_lqIuDSZzSuzJ4yGEkSTfhqI2WRKqf1AUqSYfPTIAGTkx9_MgNoCRryQoRDtK5RHuqYpOWTFcmHRoKEtxtEaEl_fEUdyM5pquR44KV27ohsQdOQet1-cPUsDUDPIefzNpzS2DAR0QFHTr4YYrfvPRY95tY1m62Hwj3BkE_EF35Ks_lELshEfjfuE7w-GAVD7o88RzMlvPLEl6m82q65v76-0zPF5ZDOQJFdkP6thS69R44WpyRYDJU_PrJ05NcZcbDsSRlVq_Tg";
        //JsonWebSignature.Payload payload;
    var validationSettings = new ValidationSettings{
        Audience = new string[]
            {"589655350334-bdk3rgelbo3i4otkj08f2hvc69g1lql4.apps.googleusercontent.com"},
        IssuedAtClockTolerance = TimeSpan.FromSeconds(100),
        ExpirationTimeClockTolerance = TimeSpan.FromSeconds(100)
    };
    try {
      JsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);
    } catch (InvalidJwtException) { return Results.StatusCode(480); }
    
    var jwt = _jwtHandler.ReadJwtToken(token);
    
    //Gets the Id given by google
    var extId = jwt.Claims.First(claim => claim.Type == "sub").Value;

    //Creates an account if there is no one with this ID from google
    if(db.Accounts.SingleOrDefault(a => a.ExternalId == extId && a.ExternalType == "google") == null){
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
        newAccount.ExternalId = extId;
        newAccount.ProfilePic = profilePic;
        newAccount.DisplayName = name;
        newAccount.Pw = passwordHash;
        newAccount.ExternalType = "google";
        newAccount.AllowSexual = true;
        newAccount.AllowViolence = true;
        newAccount.PrefLanguageId = null;
        try {
            db.Accounts.Add(mapper.Map<Account>(newAccount));
            await db.SaveChangesAsync();
        } catch (DbEntityValidationException e) {
            return Results.StatusCode(580);
        }
    }

    //Gets the user for authorization
    var user = mapper.Map<AccountDtoRead_4>(db.Accounts.SingleOrDefault(a => a.ExternalId == extId && a.ExternalType == "google"));
    if (user == null)
        return Results.StatusCode(581);
        
    var createToken = _myMethods.CreateUserToken(user, securityToken);

    return Results.Ok(new {jwt=createToken});
});


app.MapPost("/vote", async (OmneFictioContext db, VoteDtoWrite_1 request) => {
    string type = "";
    if(request.TargetPostId != null)
        type = "post";
    else if(request.TargetChapterId != null)
        type = "chapter";
    else if(request.TargetCommentId != null)
        type = "comment";
    else if(request.TargetReplyId != null)
        type = "reply";

    VoteDtoRead_2? checkVote = null;
    if(type == "post"){
        checkVote = mapper.Map<VoteDtoRead_2>
                (db.Votes.SingleOrDefault(x => x.AccountId == request.AccountId &&
                x.TargetPostId == request.TargetPostId));
    }
    else if(type == "chapter"){
        checkVote = mapper.Map<VoteDtoRead_2>
                (db.Votes.SingleOrDefault(x => x.AccountId == request.AccountId &&
                x.TargetChapterId == request.TargetChapterId));
    }
    else if(type == "comment"){
        checkVote = mapper.Map<VoteDtoRead_2>
                (db.Votes.SingleOrDefault(x => x.AccountId == request.AccountId && 
                x.TargetCommentId == request.TargetCommentId));
    }
    else if(type == "reply"){
        checkVote = mapper.Map<VoteDtoRead_2>
                (db.Votes.SingleOrDefault(x => x.AccountId == request.AccountId &&
                x.TargetReplyId == request.TargetReplyId));
    }

    try {
        if(checkVote != null && checkVote.Vote1 != request.Vote1)
            db.Votes.Remove(db.Votes.SingleOrDefault(x => x.Id == checkVote.Id));
            
        if(checkVote != null && checkVote.Vote1 == request.Vote1)
            db.Votes.Remove(db.Votes.SingleOrDefault(x => x.Id == checkVote.Id));
        else
            db.Votes.Add(mapper.Map<Vote>(request));

        await db.SaveChangesAsync();
    } catch (Exception) {
        return Results.StatusCode(580);
    }
    return Results.Ok();
});











app.Run();
