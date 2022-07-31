using Microsoft.EntityFrameworkCore;
using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;
using OmneFictio.MinApi.Configurations;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OmneFictioContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

JsonSerializerOptions options = new(){
    ReferenceHandler = ReferenceHandler.Preserve,
    WriteIndented = true
};

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
    return "Hello world";
});

app.MapGet("/posts", async (OmneFictioContext db) => {
    var posts = await mapper.ProjectTo<PostDtoRead_1>(db.Posts).ToListAsync();
    return posts;
});

app.MapPost("/register", async (OmneFictioContext db, AccountDtoWrite_1 request) => {
    Regex usernameRegex = new Regex(@"[A-Za-z0-9_]{3,30}");
    if(!usernameRegex.IsMatch(request.Username))
        return Results.BadRequest("Bad username");
    
    string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Pw);
    AccountDtoWrite_1 newAccount = new AccountDtoWrite_1();
    newAccount.Username = request.Username;
    newAccount.Pw = passwordHash;
    newAccount.Email = request.Email;
    if(request.AllowSexual != null)
        newAccount.AllowSexual = request.AllowSexual;
    if(request.AllowViolence != null)
        newAccount.AllowViolence = request.AllowViolence;
    if(db.Languages.Any(l => l.Id == request.PrefLanguageId))
        newAccount.PrefLanguageId = request.PrefLanguageId;

    db.Accounts.Add(mapper.Map<Account>(newAccount));
    await db.SaveChangesAsync();
    return Results.Ok();
});
/*
void CreatePwHash(string pw, out byte[] pwHash, out byte[] pwSalt){
    using(var hmac = new HMACSHA512()){
        pwSalt = hmac.Key;
        pwHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pw));
    }
}*/

app.Run();


/*
    return await db.Posts
    .Select(p => new {
            Id = p.Id,
            Title = p.Title,
            PostDescription = p.PostDescription,
            PublishDate = p.PublishDate,
            UpdateDate = p.UpdateDate,
            DeletedStatus = new {
                Id = p.DeletedStatus!.Id,
                Username = p.DeletedStatus.Body
            },
            PostStatus = new {
                Id = p.PostStatus!.Id,
                Username = p.PostStatus.Body
            },
            PostType = new {
                Id = p.PostType!.Id,
                Username = p.PostType.Body
            },
            Language = new {
                Id = p.Language!.Id,
                Body = p.Language.Body
            },
            Account = new {
                Id = p.Account!.Id,
                Username = p.Account.Username,
                PPic = p.Account.ProfilePic
            },
            Tags = p.Tags,
            Votes = p.Votes,
            Rates = p.Rates
    })
    .ToListAsync();
*/