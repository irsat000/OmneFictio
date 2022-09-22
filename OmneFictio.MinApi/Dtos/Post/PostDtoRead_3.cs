
namespace OmneFictio.MinApi.Dtos;

public class PostDtoRead_3 : PostDtoRead_1
{
    public PostDtoRead_3(ICollection<VoteDto>? Votes, ICollection<RateDto>? Rates) : base(Votes, Rates)
    {
    }

    public new ICollection<ChapterDtoRead_2>? Chapters { get; set; }
    public new ICollection<CommentDtoRead_2>? Comments { get; set; }
}