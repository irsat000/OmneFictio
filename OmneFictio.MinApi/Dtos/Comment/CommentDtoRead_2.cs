
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoRead_2
{
    public int Id { get; set; }
    public string Body { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public ICollection<VoteDto>? Votes { get; set; }
    public int VoteResult { get; set; } = 0;
    public int RepliesCount { get; set; } = 0;
    public int deneme { get; set; } = 0;
    public CommentDtoRead_2(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_1>? Replies)
    {
        if(Votes != null && Votes.Count > 0) {
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
        }
        if(Replies != null && Replies.Count > 0) {
            this.RepliesCount = Replies.Count(r => r.DeletedStatus!.Body == "Default");
            deneme = RepliesCount;
        }
    }
}
//Getting comments of the post. Fetched by ajax. Highlighted reply will be fetched by javascript. 
//Its replies will be sent with ajax when user click on replies.

