
namespace OmneFictio.WebApi.Dtos;

public class ChapterDtoRead_1
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public int? ChapterIndex { get; set; }
    public bool? IsPublished { get; set; }
}
public class ChapterDtoRead_2
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public int? ChapterIndex { get; set; }
    public bool? IsPublished { get; set; }
    public string? authorNotePrior { get; set; }
    public string? authorNoteLater { get; set; }
}