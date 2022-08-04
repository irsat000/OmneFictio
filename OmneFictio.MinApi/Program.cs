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
using System.Security.Claims;

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
    var token = CreateToken(user);
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

string CreateToken(AccountDtoRead_3 user){
    var tokenHandler = new JwtSecurityTokenHandler();
    var tokenDescriptor = new SecurityTokenDescriptor {
        Subject = new ClaimsIdentity(new List<Claim>(){
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email)
        }),
        Issuer = "OmneFictio.com",
        Expires = DateTime.UtcNow.AddDays(30),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityToken), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
    return token;
}
/*
void CreatePwHash(string pw, out byte[] pwHash, out byte[] pwSalt){
    using(var hmac = new HMACSHA512()){
        pwSalt = hmac.Key;
        pwHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pw));
    }
}*/

app.Run();
