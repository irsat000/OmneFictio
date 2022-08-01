using Microsoft.EntityFrameworkCore;
using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;
using OmneFictio.MinApi.Configurations;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BC = BCrypt.Net.BCrypt;

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

app.MapPost("/login", async (OmneFictioContext db, AccountDtoRead_2 request) => {
    var user = mapper.Map<AccountDtoRead_3>(db.Accounts.SingleOrDefault(x => x.Username == request.Username));
    if(user == null)
        user = mapper.Map<AccountDtoRead_3>(db.Accounts.SingleOrDefault(x => x.Email == request.Email));
    if (user == null || !BC.Verify(request.Pw, user.Pw))
        return Results.BadRequest("Login failed");

    var userJsonString = JsonSerializer.Serialize(user);
    var tokenHandler = new JwtSecurityTokenHandler();
    /*var tokenDescriptor = new SecurityTokenDescriptor {
        Claims = JsonSerializer.Deserialize<Dictionary<string, object>>(userJsonString),
        Issuer = "OmneFictio.com",
        Expires = DateTime.UtcNow.AddDays(30),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes("encryptionKey")), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));*/
    return Results.Ok("Token: ");
});

app.MapPost("/register", async (OmneFictioContext db, AccountDtoWrite_1 request) => {
    try
    {
        Regex usernameRegex = new Regex(@"[A-Za-z0-9_]{3,30}");
        if(!usernameRegex.IsMatch(request.Username) ||
            db.Accounts.Any(a => a.Username == request.Username))
            return Results.BadRequest("Bad username, bad!");

        string passwordHash = BC.HashPassword(request.Pw);
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
    }
    catch (Exception)
    {
        return Results.BadRequest("It went kaboom!");
    }
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