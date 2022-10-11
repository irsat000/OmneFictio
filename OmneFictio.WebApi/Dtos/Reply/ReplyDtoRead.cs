
namespace OmneFictio.WebApi.Dtos;
public partial class ReplyDtoRead_1
{
    public int Id { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
}
//to get the number of replies



public partial class ReplyDtoRead_2
{
    public int Id { get; set; }
    public string Body { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public int VoteResult { get; set; } = 0;
    public ReplyDtoRead_2()
    {
    } 
    public ReplyDtoRead_2(ICollection<VoteDto>? Votes)
    {
        if(Votes != null && Votes.Count > 0)
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
    } 
}
//to get the replies when clicking the replies button on comment