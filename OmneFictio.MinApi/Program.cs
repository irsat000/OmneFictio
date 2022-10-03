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

JsonSerializerOptions options = new()
{
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


var mapper = app.Services.GetService<IMapper>();
if (mapper == null)
    throw new InvalidOperationException("Mapper not found");

app.MapGet("/", () =>
{
    return "Hello jupiter";
});

//get posts
app.MapGet("/posts", async (OmneFictioContext db) =>
{
    var posts = await mapper.ProjectTo<PostDtoRead_1>(db.Posts.Where(p =>
    p.IsPublished == true &&
    p.DeletedStatus!.Body == "Default")).ToListAsync();

    return posts;
});

//get post
app.MapGet("/getpost/{postid}", async (OmneFictioContext db, int postid) =>
{
    var post = await mapper.ProjectTo<PostDtoRead_1>(db.Posts.Where(p =>
    p.IsPublished == true &&
    p.DeletedStatus.Body == "Default" &&
    p.Id == postid)).FirstOrDefaultAsync();
    return post;
});

//get post's comments
app.MapGet("/getcomments/{postid}", async (OmneFictioContext db, int postid) =>
{
    var comments = await mapper.ProjectTo<CommentDtoRead_2>(db.Comments.Where(c =>
    c.TargetPostId == postid &&
    c.DeletedStatus.Body == "Default")).ToListAsync();

    comments = comments.OrderBy(c => c.PublishDate).ToList();

    return comments;
});

app.MapGet("/get_highlighted_comment/{commentid}", async (OmneFictioContext db, int commentid) =>
{
    var replies = await mapper.ProjectTo<ReplyDtoRead_2>(db.Replies.Where(r =>
    r.CommentId == commentid)).ToListAsync();
    ReplyDtoRead_2? HighlightedReply =
                replies.OrderByDescending(r => r.VoteResult)
                        .ThenBy(r => r.PublishDate).FirstOrDefault();
    return HighlightedReply;
});

//get comment and its replies(for modal)
app.MapGet("/getcomment/{commentid}", async (OmneFictioContext db, int commentid) =>
{
    var comment = await mapper.ProjectTo<CommentDtoRead_3>(db.Comments.Where(c =>
    c.Id == commentid)).FirstOrDefaultAsync();

    if (comment != null && comment.Replies != null)
    {
        comment.Replies = comment.Replies.Where(r => r.DeletedStatus.Body == "Default").ToList();
        comment.Replies = comment.Replies.OrderBy(r => r.PublishDate).ToList();
    }
    return comment;
});

app.MapPost("/checkvoted", async (OmneFictioContext db, CheckVoted checkVoted) =>
{
    Vote? vote = new Vote();
    switch (checkVoted.TargetType)
    {
        case "post":
            vote = await db.Votes.FirstOrDefaultAsync(v =>
            v.AccountId == checkVoted.AccountId && v.TargetPostId == checkVoted.TargetId);
            break;
        case "comment":
            vote = await db.Votes.FirstOrDefaultAsync(v =>
            v.AccountId == checkVoted.AccountId && v.TargetCommentId == checkVoted.TargetId);
            break;
        case "reply":
            vote = await db.Votes.FirstOrDefaultAsync(v =>
            v.AccountId == checkVoted.AccountId && v.TargetReplyId == checkVoted.TargetId);
            break;
        case "chapter":
            vote = await db.Votes.FirstOrDefaultAsync(v =>
            v.AccountId == checkVoted.AccountId && v.TargetChapterId == checkVoted.TargetId);
            break;
    }
    if (vote != null)
        return Results.Ok(vote.Body);
    else
        return Results.NotFound();
});

app.MapGet("/check_rate_by_user/{postid}/{accountid}", async (OmneFictioContext db, int postid, int accountid) =>
{
    Rate? rate = await db.Rates.FirstOrDefaultAsync(r => 
        r.PostId == postid &&
        r.AccountId == accountid);
    if(rate != null){
        return rate.Body;
    } else {
        return -1;
    }
});







//-------------AUTH-------------------------
var securityToken = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("Token").Value);


app.MapPost("/login", async (OmneFictioContext db, AccountDtoRead_2 request) =>
{
    //Authentication
    var checkUser = await db.Accounts.SingleOrDefaultAsync(x => x.Username == request.Username);
    if (checkUser == null || !BC.Verify(request.Pw, checkUser.Pw))
        return Results.NotFound("User not found");
    //Login
    var createToken = _myMethods.CreateUserToken(checkUser, securityToken);
    if (createToken != null)
        return Results.Ok(new { jwt = createToken });
    else
        return Results.StatusCode(580);
});

app.MapPost("/register", async (OmneFictioContext db, AccountDtoWrite_1 request) =>
{
    //Input validation
    Regex usernameRegex = new Regex(@"[A-Za-z0-9_]{3,30}");
    if (!usernameRegex.IsMatch(request.Username))
        return Results.StatusCode(480);
    if (await db.Accounts.AnyAsync(a => a.Username == request.Username))
        return Results.StatusCode(481);
    if (request.Pw!.Contains(" ") || request.Pw!.Length < 6)
        return Results.StatusCode(482);
    //Fill an account object
    string passwordHash = BC.HashPassword(request.Pw);
    Account newAccount = new Account();
    newAccount.Username = request.Username;
    newAccount.Pw = passwordHash;
    newAccount.Email = request.Email;
    newAccount.ExternalType = "native";
    newAccount.EmailValid = false;
    if (request.AllowAdultContent != null)
    {
        newAccount.AllowAdultContent = request.AllowAdultContent;
    }
    else
    {
        newAccount.AllowAdultContent = false;
    }
    if (await db.Languages.AnyAsync(l => l.Id == request.PrefLanguageId))
    {
        newAccount.PrefLanguageId = request.PrefLanguageId;
    }
    //Save user in the database
    try
    {
        await db.Accounts.AddAsync(newAccount);
        await db.SaveChangesAsync();
    }
    catch (Exception)
    {
        return Results.StatusCode(483);
    }
    //Login
    var user = await db.Accounts.SingleOrDefaultAsync(x => x.Username == request.Username);
    if (user == null)
        return Results.Ok();
    var createToken = _myMethods.CreateUserToken(user, securityToken);
    return Results.Ok(new { jwt = createToken });
});

app.MapPost("/signin-external", async (OmneFictioContext db, [FromBody] string token) =>
{
    //Validate token test
    //string damagedpayload = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjAwNzE3MDcsImF1ZCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwODY4OTk5NTAyNjA3OTQ0OTk4MiIsImVtYWlsIjoiaXJzYXQwMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJpcsWfYXQgYkZW5peiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUZkWnVjcjkwMXpIcXRidU1BZXZlSlg2Q1JzemQ3dmw0eW83a3pmWW9UMUh3Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJpcsWfYXQiLCJmYW1pbHlfbmFtZSI6ImFrZGVuaXoiLCJpYXQiOjE2NjAwNzIwMDcsImV4cCI6MTY2MDA3NTYwNywianRpIjoiY2Q2NWM3Y2UyNjZlZjBhN2JmMGE1MjA4NmU4ZTQ4YmE3YTQ1ZWM5NiJ9.dKz7pzPK8rIVXglhIe14OzijmZrgc7kVhfXDFX228CRbt1go3aCvuywaoMr_UWm4AO0gX4uII_lqIuDSZzSuzJ4yGEkSTfhqI2WRKqf1AUqSYfPTIAGTkx9_MgNoCRryQoRDtK5RHuqYpOWTFcmHRoKEtxtEaEl_fEUdyM5pquR44KV27ohsQdOQet1-cPUsDUDPIefzNpzS2DAR0QFHTr4YYrfvPRY95tY1m62Hwj3BkE_EF35Ks_lELshEfjfuE7w-GAVD7o88RzMlvPLEl6m82q65v76-0zPF5ZDOQJFdkP6thHhS69R44WpyRYDJU_PrJ05NcZcbDsSRlVq_Tg";
    //string damagedsignature = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjAwNzE3MDcsImF1ZCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwODY4OTk5NTAyNjA3OTQ0OTk4MiIsImVtYWlsIjoiaXJzYXQwMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjU4OTY1NTM1MDMzNC1iZGszcmdlbGJvM2k0b3RrajA4ZjJodmM2OWcxbHFsNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJpcsWfYXQgYWtkZW5peiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUZkWnVjcjkwMXpIcXRidU1BZXZlSlg2Q1JzemQ3dmw0eW83a3pmWW9UMUh3Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJpcsWfYXQiLCJmYW1pbHlfbmFtZSI6ImFrZGVuaXoiLCJpYXQiOjE2NjAwNzIwMDcsImV4cCI6MTY2MDA3NTYwNywianRpIjoiY2Q2NWM3Y2UyNjZlZjBhN2JmMGE1MjA4NmU4ZTQ4YmE3YTQ1ZWM5NiJ9.dKz7pzPK8rIVXglhIe14OzijmZrgc7kVhfXDFX228CRbt1go3aCvuywaoMr_UWm4AO0gX4uII_lqIuDSZzSuzJ4yGEkSTfhqI2WRKqf1AUqSYfPTIAGTkx9_MgNoCRryQoRDtK5RHuqYpOWTFcmHRoKEtxtEaEl_fEUdyM5pquR44KV27ohsQdOQet1-cPUsDUDPIefzNpzS2DAR0QFHTr4YYrfvPRY95tY1m62Hwj3BkE_EF35Ks_lELshEfjfuE7w-GAVD7o88RzMlvPLEl6m82q65v76-0zPF5ZDOQJFdkP6thS69R44WpyRYDJU_PrJ05NcZcbDsSRlVq_Tg";
    //JsonWebSignature.Payload payload;
    var validationSettings = new ValidationSettings
    {
        Audience = new string[]
            {"589655350334-bdk3rgelbo3i4otkj08f2hvc69g1lql4.apps.googleusercontent.com"},
        IssuedAtClockTolerance = TimeSpan.FromSeconds(100),
        ExpirationTimeClockTolerance = TimeSpan.FromSeconds(100)
    };
    try
    {
        JsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);
    }
    catch (InvalidJwtException) { return Results.StatusCode(480); }

    var jwt = _jwtHandler.ReadJwtToken(token);

    //Gets the Id given by google
    var extId = jwt.Claims.First(claim => claim.Type == "sub").Value;

    //Creates an account if there is no one with this ID from google
    if (await db.Accounts.SingleOrDefaultAsync(a => a.ExternalId == extId && a.ExternalType == "google") == null)
    {
        var email = jwt.Claims.First(claim => claim.Type == "email").Value;
        var profilePic = jwt.Claims.First(claim => claim.Type == "picture").Value;
        var name = Regex.Replace(jwt.Claims.First(claim => claim.Type == "name").Value, @"\s+", "");
        var username = name;
        while (await db.Accounts.AnyAsync(a => a.Username == username))
        {
            username = name + _random.Next(100, 1000).ToString();
        }
        string passwordHash = BC.HashPassword(GeneratePassword.Generate(16, 8));

        Account newAccount = new Account();
        newAccount.Username = username;
        newAccount.Email = email;
        newAccount.ExternalId = extId;
        newAccount.ProfilePic = profilePic;
        newAccount.DisplayName = name;
        newAccount.Pw = passwordHash;
        newAccount.ExternalType = "google";
        newAccount.AllowAdultContent = false;
        newAccount.PrefLanguageId = null;
        newAccount.EmailValid = true;

        try
        {
            await db.Accounts.AddAsync(newAccount);
            await db.SaveChangesAsync();
        }
        catch (DbEntityValidationException)
        {
            return Results.StatusCode(580);
        }
    }

    //Gets the user for authorization
    var user = await db.Accounts.SingleOrDefaultAsync(a => a.ExternalId == extId && a.ExternalType == "google");
    if (user == null)
        return Results.StatusCode(581);

    var createToken = _myMethods.CreateUserToken(user, securityToken);

    return Results.Ok(new { jwt = createToken });
});



//-------Actions

app.MapPost("/vote", async (OmneFictioContext db, VoteDtoWrite_1 request) =>
{
    if (await db.Accounts.FirstOrDefaultAsync(a => a.Id == request.AccountId) == null)
    {
        return Results.StatusCode(480);
    }

    string type = request.TargetType;

    //checks if it's already voted
    Vote? checkVote = null;
    if (type == "post")
    {
        checkVote = await db.Votes.FirstOrDefaultAsync(x => x.AccountId == request.AccountId &&
                x.TargetPostId == request.TargetId);
    }
    else if (type == "chapter")
    {
        checkVote = await db.Votes.FirstOrDefaultAsync(x => x.AccountId == request.AccountId &&
                x.TargetChapterId == request.TargetId);
    }
    else if (type == "comment")
    {
        checkVote = await db.Votes.FirstOrDefaultAsync(x => x.AccountId == request.AccountId &&
                x.TargetCommentId == request.TargetId);
    }
    else if (type == "reply")
    {
        checkVote = await db.Votes.FirstOrDefaultAsync(x => x.AccountId == request.AccountId &&
                x.TargetReplyId == request.TargetId);
    }

    //it's already voted and it's the opposite value
    if (checkVote != null && checkVote.Body != request.Body)
    {
        db.Votes.Remove(db.Votes.SingleOrDefault(x => x.Id == checkVote.Id)!);
    }
    //if user clicks on the same button to take their vote back
    //else, votes the post normally
    if (checkVote != null && checkVote.Body == request.Body)
    {
        db.Votes.Remove(db.Votes.SingleOrDefault(x => x.Id == checkVote.Id)!);
    }
    else
    {
        Vote newVote = new Vote
        {
            AccountId = request.AccountId,
            Body = request.Body
        };

        if (type == "post")
            newVote.TargetPostId = request.TargetId;
        else if (type == "chapter")
            newVote.TargetChapterId = request.TargetId;
        else if (type == "comment")
            newVote.TargetCommentId = request.TargetId;
        else if (type == "reply")
            newVote.TargetReplyId = request.TargetId;
        await db.Votes.AddAsync(newVote);
    }

    try
    {
        await db.SaveChangesAsync();
    }
    catch (Exception)
    {
        return Results.StatusCode(580);
    }
    return Results.Ok();
});

app.MapPost("/rate", async (OmneFictioContext db, RateInfo request) =>
{
    if (!(request.RateValue >= 1 && request.RateValue <= 10))
    {
        return Results.BadRequest();
    }
    //check existing rate and replace if it exists
    Rate? rate = await db.Rates.FirstOrDefaultAsync(x => 
        x.AccountId == request.AccountId &&
        x.PostId == request.PostId);
    if (rate != null)
    {
        db.Rates.Remove(db.Rates.SingleOrDefault(x => x.Id == rate.Id)!);
    }
    //create new rate
    rate = new Rate
    {
        AccountId = request.AccountId,
        PostId = request.PostId,
        Body = request.RateValue
    };
    await db.Rates.AddAsync(rate);

    try
    {
        await db.SaveChangesAsync();
    }
    catch (Exception)
    {
        return Results.StatusCode(580);
    }
    return Results.Ok();
});


app.MapPost("/createpost", async (OmneFictioContext db, PostDtoWrite_1 request) =>
{
    if (await db.Accounts.FirstOrDefaultAsync(a => a.Id == request.AccountId) == null ||
     await db.Languages.FirstOrDefaultAsync(l => l.Id == request.LanguageId) == null ||
     await db.PostTypes.FirstOrDefaultAsync(t => t.Id == request.PostTypeId) == null ||
     await db.RatedAs.FirstOrDefaultAsync(s => s.Id == request.RatedAsId) == null)
    {
        return Results.StatusCode(480);
    }
    else if (request.Title.Length > 250)
    {
        return Results.StatusCode(481);
    }
    else if (request.PostDescription.Length > 2000)
    {
        return Results.StatusCode(482);
    }
    else if (request.Title.Length == 0 || request.Title == null)
    {
        return Results.StatusCode(483);
    }
    else if (request.PostDescription.Length < 50 || request.PostDescription == null)
    {
        return Results.StatusCode(484);
    }

    Post newpost = new Post();
    newpost.Title = request.Title;
    newpost.PostDescription = request.PostDescription;
    newpost.LanguageId = request.LanguageId;
    newpost.AccountId = request.AccountId;
    newpost.PostTypeId = request.PostTypeId;
    newpost.RatedAsId = request.RatedAsId;
    newpost.CoverImage = request.CoverImage;
    newpost.PublishDate = DateTime.Now;
    newpost.UpdateDate = DateTime.Now;
    newpost.DeletedStatusId = 1;
    newpost.PostStatusId = 1;
    newpost.IsPublished = true;
    if (request.TagList != null)
    {
        foreach (int tagid in request.TagList)
        {
            Tag? tag = await db.Tags.FirstOrDefaultAsync(s => s.Id == tagid);
            if (tag != null)
            {
                newpost.Tags.Add(tag);
            }
        }
    }
    if (request.PostTypeId == 3)
    {
        if (request.SeriesList != null)
        {
            foreach (int seriesid in request.SeriesList)
            {
                ExistingStory? series = await db.ExistingStories.FirstOrDefaultAsync(s => s.Id == seriesid);
                if (series != null)
                {
                    newpost.ExistingStories.Add(series);
                }
            }
        }
        if (newpost.ExistingStories.Count == 0)
        {
            return Results.StatusCode(480);
        }
    }

    try
    {
        await db.Posts.AddAsync(newpost);
        await db.SaveChangesAsync();
    }
    catch (Exception)
    {
        return Results.StatusCode(580);
    }

    return Results.Ok();
});








app.Run();
