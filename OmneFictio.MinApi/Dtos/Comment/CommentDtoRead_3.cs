
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoRead_3 : CommentDtoRead_2
{
    public ICollection<ReplyDtoRead_2>? Replies { get; set; }
    public CommentDtoRead_3(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_1>? Replies) : base(Votes, Replies)
    {
        
    }
}
//Get one comment and its replies