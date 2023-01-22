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