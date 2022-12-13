
namespace OmneFictio.WebApi.Dtos;

public class CommentDtoWrite_1
{
    public int? accountId { get; set; }
    public string body { get; set; } = null!;
    public int? targetPostId { get; set; }
    public int? targetChapterId { get; set; }
}
//Adding a comment