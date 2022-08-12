
namespace OmneFictio.Web.Models;

public partial class AccountWrite1
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool? AllowSexual { get; set; }
    public bool? AllowViolence { get; set; }
    public int? PrefLanguageId { get; set; }
}
//sending payload to api

public partial class AccountWrite2
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string AllowSexual { get; set; } = null!;
    public string AllowViolence { get; set; } = null!;
    public string PrefLanguageId { get; set; } = null!;
}
//Getting payload from registration form