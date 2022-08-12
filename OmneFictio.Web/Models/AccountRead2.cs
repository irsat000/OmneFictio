
namespace OmneFictio.Web.Models;

public partial class AccountRead2
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public bool? RememberMe { get; set; }
}