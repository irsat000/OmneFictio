
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
    public bool? AllowAdultContent { get; set; }
    public int? PrefLanguageId { get; set; }
}
//Getting payload from registration form
//sending payload to api


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
    public int? AccountId { get; set; }
    public int? RatedAsId { get; set; }
    public string? CoverImage { get; set; }
    public List<int>? TagList { get; set; }
    public List<int>? SeriesList { get; set; }
}
//create post request














