
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoRead_3 : CommentDtoRead_2
{
    public CommentDtoRead_3(ICollection<VoteDto>? Votes) : base(Votes)
    {
    }

    public new ICollection<ReplyDtoRead_2>? Replies { get; set; }
}
//Used as part of the individual post. Its replies will be send with ajax when user click on replies.
