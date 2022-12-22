
namespace OmneFictio.WebApi.Dtos;

public class PostDtoWrite_1
{
    public string title { get; set; } = null!;
    public string postDescription { get; set; } = null!;
    public byte postTypeId { get; set; }
    public int languageId { get; set; }
    public int? accountId { get; set; }
    public int ratedAsId { get; set; }
    public string? coverImage { get; set; }
    public List<int>? tagList { get; set; }
    public List<int>? seriesList { get; set; }
    public bool isPublished { get; set; }
}
//for creating the post
//The model that comes from the controller