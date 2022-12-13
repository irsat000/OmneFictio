
namespace OmneFictio.WebApi.Dtos;
public class CommentDtoRead_1
{
    public int id { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public ICollection<ReplyDtoRead_1>? replies { get; set; }
}




public class CommentDtoRead_2
{
    public int id { get; set; }
    public string body { get; set; } = null!;
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }

    public AccountDtoRead_1? account { get; set; }
    public int? targetPostId { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public int voteResult { get; set; } = 0;
    public int repliesLength { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
    public CommentDtoRead_2(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_1>? Replies)
    {
        if(Votes != null && Votes.Count > 0) {
            this.voteResult = Votes.Count(l => l.body) - Votes.Count(d => !d.body);
        }
        if(Replies != null && Replies.Count > 0) {
            this.repliesLength = Replies.Count(r => r.deletedStatus!.body == "Default");
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
    public int voteResult { get; set; } = 0;
    public int repliesLength { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
    public ICollection<ReplyDtoRead_2>? Replies { get; set; }
    public CommentDtoRead_3(ICollection<VoteDto>? Votes, ICollection<ReplyDtoRead_2>? Replies)
    {
        if(Votes != null && Votes.Count > 0) {
            this.voteResult = Votes.Count(l => l.body) - Votes.Count(d => !d.body);
        }
        if(Replies != null && Replies.Count > 0) {
            this.repliesLength = Replies.Count(r => r.deletedStatus!.body == "Default");
        }
        this.Replies = Replies;
    }
}
//Get one comment and its replies




/*int x = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
this.voteResult = x < 0 ? "--" : x.ToString();*/