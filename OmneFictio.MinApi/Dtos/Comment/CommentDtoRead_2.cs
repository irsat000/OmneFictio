
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoRead_2
{
    public int Id { get; set; }
    public string Body { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public ICollection<ReplyDtoRead_2>? Replies { get; set; }
    public ICollection<VoteDto>? Votes { get; set; }
    public int VoteResult { get; set; } = 0;
    public CommentDtoRead_2(ICollection<VoteDto>? Votes)
    {
        if(Votes != null && Votes.Count > 0){
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
        }
    } 
}
//Used as part of the individual post. Its replies will be send with ajax when user click on replies.
