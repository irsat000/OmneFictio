
namespace OmneFictio.MinApi.Dtos;

public class PostDtoWrite_1
{
    public string Title { get; set; } = null!;
    public string PostDescription { get; set; } = null!;
    public DateTime? PublishDate { get; set; }
    public DateTime? UpdateDate { get; set; }
    public byte? DeletedStatusId { get; set; }
    public byte? PostStatusId { get; set; }
    public byte? PostTypeId { get; set; }
    public int? LanguageId { get; set; }
    public int? AccountId { get; set; }
    public string? CoverImage { get; set; }
    public bool? IsPublished { get; set; }
}
//for creating the post