
namespace OmneFictio.Web.Models;

public partial class AccountRead2
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string RememberMe { get; set; } = null!;
}
//Authentication

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







public partial class VoteWrite1
{
    public int? AccountId { get; set; }
    public bool Body { get; set; }
    public int? TargetPostId { get; set; }
    public int? TargetChapterId { get; set; }
    public int? TargetCommentId { get; set; }
    public int? TargetReplyId { get; set; }
}
//Voting



public class PostWrite1
{
    public string Title { get; set; } = null!;
    public string PostDescription { get; set; } = null!;
    public byte PostTypeId { get; set; }
    public int LanguageId { get; set; }
    public int AccountId { get; set; }
    public string? CoverImage { get; set; }
}
//for creating the post




