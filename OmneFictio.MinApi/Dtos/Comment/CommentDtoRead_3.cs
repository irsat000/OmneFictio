
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoRead_3 : CommentDtoRead_2
{
    public ReplyDtoRead_2? HighlightedReply { get; set; }
    public CommentDtoRead_3(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_2>? Replies) : base(Votes)
    {
        if(Replies != null && Replies.Count() > 0) {
            HighlightedReply = Replies.OrderByDescending(r => r.VoteResult)
                                .ThenBy(r => r.PublishDate).FirstOrDefault();
        }
    }
}
//Getting comments of the post. Fetched by ajax. Highlighted reply will be fetched by javascript. 
//Its replies will be sent with ajax when user click on replies.
