using Microsoft.EntityFrameworkCore;
using OmneFictio.WebApi.Configurations;
using OmneFictio.WebApi.Entities;
using SecuringWebApiUsingApiKey.Middleware;
using OmneFictio.WebApi.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.

services.AddTransient<IHelperServices, HelperServices>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<OmneFictioContext>(opt => 
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ApiKeyMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
