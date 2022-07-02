using System;
using System.Collections.Generic;
using OmneFictio.MinApi.Models;
using OmneFictio.MinApi.Dtos;

namespace OmneFictio.MinApi.Dtos;

public class PostDtoRead_1
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string PostDescription { get; set; } = null!;
    public DateTime PublishDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public virtual AccountDtoRead_1? Account { get; set; }
    public virtual DeletedStatusDto? DeletedStatus { get; set; }
    public virtual LanguageDto? Language { get; set; }
    public virtual PostStatusDto? PostStatus { get; set; }
    public virtual PostTypeDto? PostType { get; set; }
    //-----------
    public virtual ICollection<ChapterDtoRead_1>? Chapters { get; set; }
    public virtual ICollection<CommentDtoRead_1>? Comments { get; set; }
    //-----------
    public virtual ICollection<RateDto>? Rates { get; set; }
    public virtual ICollection<VoteDto>? Votes { get; set; }

    public virtual ICollection<GiftDto>? Gifts { get; set; }
    public virtual ICollection<RatedAsDto>? RatedAs { get; set; }
    public virtual ICollection<TagDto>? Tags { get; set; }
}