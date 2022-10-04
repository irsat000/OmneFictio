
namespace OmneFictio.MinApi.Dtos;

public class CommentDtoWrite_1
{
    public int? AccountId { get; set; }
    public string Body { get; set; } = null!;
    public int? TargetPostId { get; set; }
    public int? TargetChapterId { get; set; }
}
//Adding a comment