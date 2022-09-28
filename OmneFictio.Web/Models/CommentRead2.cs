// Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
using OmneFictio.Web.CommentReadModel;
namespace OmneFictio.Web.CommentReadModel2;

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
    public CommentReadModel.Account account { get; set; }
    public CommentReadModel.DeletedStatus deletedStatus { get; set; }
    public List<CommentReadModel.Vote> votes { get; set; }
    public int voteResult { get; set; }
}
//Get comment and its replies





