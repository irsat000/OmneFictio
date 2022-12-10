
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
    public object? AllowAdultContent { get; set; } //bool
    public object? PrefLanguageId { get; set; } //int
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
//Voting


public class PostWrite1
{
    public string Title { get; set; } = null!;
    public string PostDescription { get; set; } = null!;
    public object PostTypeId { get; set; } = null!; //byte
    public object LanguageId { get; set; } = null!; //int
    public int? AccountId { get; set; }
    public object? RatedAsId { get; set; } //int?
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

public class AuthToken
{
    public string token { get; set; } = null!;
}
//To get token from client






