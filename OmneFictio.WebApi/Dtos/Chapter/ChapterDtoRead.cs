
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
    public int id { get; set; }
    public string? title { get; set; }
    public int? chapterIndex { get; set; }
    public bool? isPublished { get; set; }
    public string? authorNotePrior { get; set; }
    public string? authorNoteLater { get; set; }
    public string? body { get; set; }
}