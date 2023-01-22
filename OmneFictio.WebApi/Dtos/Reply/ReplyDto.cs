
namespace OmneFictio.WebApi.Dtos;
public partial class ReplyDtoRead_1
{
    public int id { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
}
//to get the number of replies



public partial class ReplyDtoRead_2
{
    public int id { get; set; }
    public string body { get; set; } = null!;
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }

    public AccountDtoRead_1? account { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public int voteResult { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
}
//to get the replies when clicking the replies button on comment

