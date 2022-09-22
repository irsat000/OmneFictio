
namespace OmneFictio.MinApi.Dtos;

public partial class CommentDtoRead_2
{
    public int Id { get; set; }
    public string Body { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public ICollection<ReplyDtoRead_1>? Replies { get; set; }
    public ICollection<VoteDto>? Votes { get; set; }
}
