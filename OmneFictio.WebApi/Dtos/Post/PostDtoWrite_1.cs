
namespace OmneFictio.WebApi.Dtos;

public class PostDtoWrite_1
{
    public string Title { get; set; } = null!;
    public string PostDescription { get; set; } = null!;
    public byte? PostTypeId { get; set; }
    public int? LanguageId { get; set; }
    public int? AccountId { get; set; }
    public int? RatedAsId { get; set; }
    public string? CoverImage { get; set; }
    public List<int>? TagList { get; set; }
    public List<int>? SeriesList { get; set; }
}
//for creating the post
//The model that comes from the controller