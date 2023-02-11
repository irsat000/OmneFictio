
namespace OmneFictio.Web.Models;

public class AccountRead2
{
    public string username { get; set; } = null!;
    public string pw { get; set; } = null!;
    public string rememberMe { get; set; } = null!;
}
//Authentication

public class AccountWrite1
{
    public string username { get; set; } = null!;
    public string pw { get; set; } = null!;
    public string email { get; set; } = null!;
    public object? allowAdultContent { get; set; } //bool
    public object? prefLanguageId { get; set; } //int
}
//Getting payload from registration form
//sending payload to api


public partial class SavedPostWrite
{
    public int? accountId { get; set; }
    public int targetPostId { get; set; }
}
//Saving post

public class VoteWrite1
{
    public int? accountId { get; set; }
    public bool body { get; set; }
    public int? targetId { get; set; }
    public string? targetType { get; set; }
}
//Voting


public class PostWrite1
{
    public string title { get; set; } = null!;
    public string postDescription { get; set; } = null!;
    public string postType { get; set; } = null!; //byte
    public int languageId { get; set; } //int
    public int? accountId { get; set; }
    public int ratedAsId { get; set; } //int
    public string? coverImage { get; set; }
    public List<int>? tagList { get; set; }
    public List<int>? seriesList { get; set; }
}
//create post request


public class RateInfo
{
    public int? accountId { get; set; }
    public int postId { get; set; }
    public byte rateValue { get; set; }
}
//rate the post


public class CommentInput
{
    public int? accountId { get; set; }
    public string body { get; set; } = null!;
    public int? targetPostId { get; set; }
    public int? targetChapterId { get; set; }
}
//Adding a comment
public class ReplyInput
{
    public int? accountId { get; set; }
    public string body { get; set; } = null!;
    public int commentId { get; set; }
    public string? targetUsername { get; set; }
}

public class AuthToken
{
    public string token { get; set; } = null!;
}
//To get token from client






