
namespace OmneFictio.WebApi.Dtos;
public class CommentDtoRead_1
{
    public int Id { get; set; }
    public ICollection<ReplyDtoRead_1>? Replies { get; set; }
}




public class CommentDtoRead_2
{
    public int Id { get; set; }
    public string Body { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public int VoteResult { get; set; } = 0;
    public int RepliesLength { get; set; } = 0;
    public CommentDtoRead_2(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_1>? Replies)
    {
        if(Votes != null && Votes.Count > 0) {
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
        }
        if(Replies != null && Replies.Count > 0) {
            this.RepliesLength = Replies.Count(r => r.DeletedStatus!.Body == "Default");
        }
    }
}
//Getting comments of the post. Fetched by ajax. Highlighted reply will be fetched by javascript. 
//Its replies will be sent with ajax when user click on replies.




public class CommentDtoRead_3
{
    public int Id { get; set; }
    public string Body { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public int VoteResult { get; set; } = 0;
    public int RepliesLength { get; set; } = 0;
    public ICollection<ReplyDtoRead_2>? Replies { get; set; }
    public CommentDtoRead_3(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_2>? Replies)
    {
        if(Votes != null && Votes.Count > 0) {
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
        }
        if(Replies != null && Replies.Count > 0) {
            this.RepliesLength = Replies.Count(r => r.DeletedStatus!.Body == "Default");
        }
        this.Replies = Replies;
    }
}
//Get one comment and its replies




/*int x = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
this.VoteResult = x < 0 ? "--" : x.ToString();*/