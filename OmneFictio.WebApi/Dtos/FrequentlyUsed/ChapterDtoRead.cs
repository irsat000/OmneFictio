
namespace OmneFictio.WebApi.Dtos;

public class ChapterDtoRead_1
{
    public int id { get; set; }
    public string title { get; set; } = null!;
    public int chapterIndex { get; set; }
    public bool isPublished { get; set; }
}
public class ChapterDtoRead_2
{
    public int id { get; set; }
    public string title { get; set; } = null!;
    public int chapterIndex { get; set; }
    public string? authorNotePrior { get; set; }
    public string? authorNoteLater { get; set; }
    public string body { get; set; } = null!;
    public PostDtoRead_2 post { get; set; } = null!;
    public DeletedStatusDto? deletedStatus { get; set; }
    public int voteResult { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
}