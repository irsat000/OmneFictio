
namespace OmneFictio.MinApi.Dtos;
public partial class ReplyDtoRead_1
{
    public int Id { get; set; }
    /*public DateTime PublishDate { get; set; }
    public ICollection<VoteDto>? Votes { get; set; }
    public int VoteResult { get; set; } = 0;
    public ReplyDtoRead_1(ICollection<VoteDto>? Votes)
    {
        if(Votes != null && Votes.Count > 0)
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);
    }*/
}
//to get the number of replies