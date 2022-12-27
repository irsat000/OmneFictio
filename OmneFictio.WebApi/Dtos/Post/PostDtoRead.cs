
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
    public LanguageDto language { get; set; } = null!;
    public PostStatusDto postStatus { get; set; } = null!;
    public PostTypeDto postType { get; set; } = null!;
    public RatedAsDto ratedAs { get; set; } = null!;
    //-----------
    public ICollection<ChapterDtoRead_1>? Chapters { get; set; }
    //-----------
    public ICollection<PostGiftDto>? postGifts { get; set; }
    public ICollection<TagDto>? tags { get; set; }
    public ICollection<ExistingStoryDto>? existingStories { get; set; }

    public int voteResult { get; set; } = 0;
    public double rateResult { get; set; } = -1;
    public int comRepLength { get; set; } = 0;
    public int wordsLength { get; set; } = 0;
    public bool? votedByUser { get; set; } = null;
    public double? ratedByUser { get; set; } = null;
    public bool savedByUser { get; set; } = false;
}


public class PostDtoRead_2
{
    public string title { get; set; } = null!;
    public AccountDtoRead_1? account { get; set; }
    public ICollection<ChapterDtoRead_1>? Chapters { get; set; }
}
//To get the parent of chapter