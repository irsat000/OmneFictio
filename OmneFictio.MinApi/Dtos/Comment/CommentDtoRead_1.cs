
namespace OmneFictio.MinApi.Dtos;
public class CommentDtoRead_1
{
    public int Id { get; set; }
    public ICollection<ReplyDtoRead_1>? Replies { get; set; }
}