
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.Extensions.DependencyInjection.Extensions;
using OmneFictio.Web.Infrastructure;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
var configuration = builder.Configuration;
var services = builder.Services;

services.AddTransient<IHelperServices, HelperServices>();

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient("of", client => {
    client.BaseAddress = new Uri("https://localhost:7223/");
    client.DefaultRequestHeaders.Add("ApiKey", configuration.GetSection("ApiKey").Value);
});
builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddSession(options =>
    {
        options.IdleTimeout = TimeSpan.FromHours(4);
    });
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromHours(4);
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    })
    .AddGoogle(GoogleDefaults.AuthenticationScheme, googleOptions =>
    {
        googleOptions.ClientId = configuration["OF:Authentication:Google:ClientId"];
        googleOptions.ClientSecret = configuration["OF:Authentication:Google:ClientSecret"];
        googleOptions.CorrelationCookie.SameSite = SameSiteMode.None;
        googleOptions.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;
    });
//Client id and secret are in secret store

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();


app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
