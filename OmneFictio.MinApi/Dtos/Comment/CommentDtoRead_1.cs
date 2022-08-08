
namespace OmneFictio.MinApi.Dtos;
public partial class CommentDtoRead_1
{
    public int Id { get; set; }
    public virtual ICollection<ReplyDtoRead_1>? Replies { get; set; }
}