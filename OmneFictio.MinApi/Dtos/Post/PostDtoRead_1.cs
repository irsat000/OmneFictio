
namespace OmneFictio.MinApi.Dtos;

public class PostDtoRead_1
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string PostDescription { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public string? CoverImage { get; set; }

    public AccountDtoRead_1? Account { get; set; }
    public DeletedStatusDto? DeletedStatus { get; set; }
    public LanguageDto? Language { get; set; }
    public PostStatusDto? PostStatus { get; set; }
    public PostTypeDto? PostType { get; set; }
    public RatedAsDto? RatedAs { get; set; }
    //-----------
    public ICollection<ChapterDtoRead_1>? Chapters { get; set; }
    public ICollection<CommentDtoRead_1>? Comments { get; set; }
    //-----------
    public ICollection<PostGiftDto>? PostGifts { get; set; }
    public ICollection<RateDto>? Rates { get; set; }
    public ICollection<VoteDto>? Votes { get; set; }
    public ICollection<TagDto>? Tags { get; set; }
    public ICollection<ExistingStoryDto>? ExistingStories { get; set; }

    public int VoteResult { get; set; } = 0;
    public double RateResult { get; set; } = -1;
    public PostDtoRead_1(ICollection<VoteDto>? Votes, ICollection<RateDto>? Rates)
    {
        if(Votes != null && Votes.Count > 0)
            this.VoteResult = Votes.Count(l => l.Body) - Votes.Count(d => !d.Body);

        if(Rates != null && Rates.Count > 0)
            this.RateResult = Rates.Average(r => r.Body);
    }
}