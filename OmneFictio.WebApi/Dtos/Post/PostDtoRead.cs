
namespace OmneFictio.WebApi.Dtos;

public class PostDtoRead_1
{
    public int id { get; set; }
    public string title { get; set; } = null!;
    public string postDescription { get; set; } = null!;
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public string? coverImage { get; set; }

    public AccountDtoRead_1? account { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public LanguageDto? language { get; set; }
    public PostStatusDto? postStatus { get; set; }
    public PostTypeDto? postType { get; set; }
    public RatedAsDto? ratedAs { get; set; }
    //-----------
    public ICollection<ChapterDtoRead_1>? chapters { get; set; }
    //-----------
    public ICollection<PostGiftDto>? postGifts { get; set; }
    public ICollection<TagDto>? tags { get; set; }
    public ICollection<ExistingStoryDto>? existingStories { get; set; }

    public int voteResult { get; set; } = 0;
    public double rateResult { get; set; } = -1;
    public PostDtoRead_1(ICollection<VoteDto>? votes, ICollection<RateDto>? rates)
    {
        if (votes != null && votes.Count > 0)
            this.voteResult = votes.Count(l => l.Body) - votes.Count(d => !d.Body);

        if (rates != null && rates.Count > 0)
            this.rateResult = rates.Average(r => r.Body);

    }
}