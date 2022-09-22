// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
namespace OmneFictio.Web.CommentReadModel;

public class Account
{
    public int id { get; set; }
    public string username { get; set; }
    public string displayName { get; set; }
    public string profilePic { get; set; }
    public string selfDesc { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Authority> authorities { get; set; }
}

public class Authority
{
    public string body { get; set; }
}

public class DeletedStatus
{
    public string body { get; set; }
}

public class Reply
{
    public int id { get; set; }
    public string body { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Vote> votes { get; set; }
    public int voteResult { get; set; }
}

public class ReadComment1
{
    public int id { get; set; }
    public string body { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Reply> replies { get; set; }
    public List<Vote> votes { get; set; }
    public int voteResult { get; set; }
}

public class Vote
{
    public int accountId { get; set; }
    public bool body { get; set; }
}

