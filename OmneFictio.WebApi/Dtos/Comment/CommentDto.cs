
namespace OmneFictio.WebApi.Dtos;
public class CommentDtoRead_1
{
    public int id { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public ICollection<ReplyDtoRead_1>? Replies { get; set; }
}
//Not necessary right now




public class CommentDtoRead_2
{
    public int id { get; set; }
    public string body { get; set; } = null!;
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public int? targetPostId { get; set; }
    public AccountDtoRead_1? account { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public int voteResult { get; set; } = 0;
    public int repliesLength { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
    public ReplyDtoRead_2? highlightedReply { get; set; } = null;
}
//Getting comments of the post. Fetched by ajax. Highlighted reply will be fetched by javascript. 
//Its replies will be sent with ajax when user click on replies.



