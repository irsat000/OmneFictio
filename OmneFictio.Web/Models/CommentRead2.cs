// Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
using OmneFictio.Web.CommentReadModel;
namespace OmneFictio.Web.PostReadModel;

public class CommentRead2 : CommentRead1
{
    public List<Reply> replies { get; set; }
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
//Get comment and its replies





