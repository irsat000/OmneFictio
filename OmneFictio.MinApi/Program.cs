using Microsoft.EntityFrameworkCore;
using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;
using OmneFictio.MinApi.Configurations;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OmneFictioContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

JsonSerializerOptions options = new(){
    ReferenceHandler = ReferenceHandler.Preserve,
    WriteIndented = true
};
OmneFictioContext _db = new OmneFictioContext();

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

app.MapGet("/posts", async () => {
    var posts = await mapper.ProjectTo<PostDtoRead_1>(_db.Posts).ToListAsync();
    return posts;
});

app.MapPost("/register", async (AccountDtoWrite_1 request) => {
    AccountDtoWrite_1 newAccount = new AccountDtoWrite_1{
        Username = request.Username,
        Pw = request.Pw,
        Email = request.Email,
        PrefLanguageId = request.PrefLanguageId,
        AllowSexual = request.AllowSexual,
        AllowViolence = request.AllowViolence
    };
    _db.Accounts.Add(mapper.Map<Account>(newAccount));
    _db.SaveChangesAsync();
        
    return Results.Ok();
});

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