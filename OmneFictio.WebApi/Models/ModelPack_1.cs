namespace OmneFictio.WebApi.Models;

public class CheckVoted
{
    public int accountId { get; set; }
    public int targetId { get; set; }
    public string? targetType { get; set; }
}

public class RateInfo : CheckRateInfo
{
    public byte rateValue { get; set; }
}
public class CheckRateInfo
{
    public int accountId { get; set; }
    public int postId { get; set; }
}

public class ReplyRequest
{
    public int accountId { get; set; }
    public string body { get; set; } = null!;
    public int commentId { get; set; }
    public string? targetUsername { get; set; }
}
//adding a reply to comment with or without referencing someone

public class CommentRequest
{
    public int accountId { get; set; }
    public string body { get; set; } = null!;
    public int? targetPostId { get; set; }
    public int? targetChapterId { get; set; }
}
//Adding a comment

public class CreatePost{
    public string title { get; set; } = null!;
    public string postDescription { get; set; } = null!;
    public byte postTypeId { get; set; }
    public int languageId { get; set; } //int
    public int? accountId { get; set; }
    public int ratedAsId { get; set; } //int
    public int[]? coverImage { get; set; }
    public Boolean coverSent { get; set; }
    public List<int> tagList { get; set; } = null!;
    public List<int>? seriesList { get; set; }
}
//for creating the post