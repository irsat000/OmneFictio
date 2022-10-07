
namespace OmneFictio.Web.Models;

public class AccountRead2
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string RememberMe { get; set; } = null!;
}
//Authentication

public class AccountWrite1
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool? AllowAdultContent { get; set; }
    public int? PrefLanguageId { get; set; }
}
//Getting payload from registration form
//sending payload to api


public class VoteWrite1
{
    public int? AccountId { get; set; }
    public bool Body { get; set; }
    public int? TargetId { get; set; }
    public string? TargetType { get; set; }
}
public class CheckVoted
{
    public int? AccountId { get; set; }
    public int TargetId { get; set; }
    public string TargetType { get; set; }
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


public class RateInfo
{
    public int? AccountId { get; set; }
    public int PostId { get; set; }
    public int RateValue { get; set; }
}
//rate the post


public class CommentWrite1
{
    public int? AccountId { get; set; }
    public string Body { get; set; } = null!;
    public int? TargetPostId { get; set; }
    public int? TargetChapterId { get; set; }
}
//Adding a comment

public class GetPosts_Options
{
    public int? Page { get; set; } = 1;
    public int MaxPostPerPage { get; set; } = 20;
}
//Get posts - Settings










