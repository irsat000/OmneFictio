
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoRead_4 : CommentDtoRead_2
{
    public CommentDtoRead_4(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_1>? Replies) : base(Votes, Replies)
    {
        /*, ICollection<ReplyDtoRead_2>? Replies
    public int? HighlightedReply { get; set; }
        if(Replies != null && Replies.Count() > 0) {
            HighlightedReply = Replies.OrderByDescending(r => r.VoteResult)
                                .ThenBy(r => r.PublishDate).FirstOrDefault()!.Id;
        }*/
    }
}
//Getting comments of the post. Fetched by ajax. Highlighted reply will be fetched by javascript. 
//Its replies will be sent with ajax when user click on replies.
