
namespace OmneFictio.WebApi.Dtos;

public class ChapterDtoRead_1
{
    public int id { get; set; }
    public string? title { get; set; }
    public int? chapterIndex { get; set; }
    public bool? isPublished { get; set; }
}
public class ChapterDtoRead_2
{
    public int id { get; set; }
    public string? title { get; set; }
    public int? chapterIndex { get; set; }
    public string? authorNotePrior { get; set; }
    public string? authorNoteLater { get; set; }
    public string? body { get; set; }
    public PostDtoRead_2? post { get; set; }
    public int voteResult { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
    public ChapterDtoRead_2(ICollection<VoteDto>? Votes)
    {
        if(Votes != null && Votes.Count > 0) {
            this.voteResult = Votes.Count(l => l.body) - Votes.Count(d => !d.body);
        }
    }
}