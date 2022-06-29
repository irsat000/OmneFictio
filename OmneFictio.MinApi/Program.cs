using Microsoft.EntityFrameworkCore;
using OmneFictio.MinApi.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OmneFictioContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
JsonSerializerOptions options = new(){
    ReferenceHandler = ReferenceHandler.Preserve,
    WriteIndented = true
};

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/", () =>
{
    return "Hello world";
});

app.MapGet("/posts", async (OmneFictioContext db) => {
    return await db.Posts
    .Select(p => new {
            Id = p.Id,
            Title = p.Title,
            PostDescription = p.PostDescription,
            PublishDate = p.PublishDate,
            UpdateDate = p.UpdateDate,
            DeletedStatus = new {
                Id = p.DeletedStatus.Id,
                Username = p.DeletedStatus.Body
            },
            PostStatus = new {
                Id = p.PostStatus.Id,
                Username = p.PostStatus.Body
            },
            PostType = new {
                Id = p.PostType.Id,
                Username = p.PostType.Body
            },
            Language = new {
                Id = p.Language.Id,
                Body = p.Language.Body
            },
            Account = new {
                Id = p.Account.Id,
                Username = p.Account.Username,
                PPic = p.Account.ProfilePic
            }
    })
    .ToListAsync();
});

app.Run();

    //await db.Posts.ToListAsync());


/*
app.MapGet("/todoitems", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapGet("/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

app.MapPost("/todoitems", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.Run();

class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options)
        : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}

*/