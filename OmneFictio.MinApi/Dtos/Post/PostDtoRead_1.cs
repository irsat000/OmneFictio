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
    public virtual DeletedStatus? DeletedStatus { get; set; }
    public virtual Language? Language { get; set; }
    public virtual PostStatus? PostStatus { get; set; }
    public virtual PostType? PostType { get; set; }
    public virtual ICollection<Chapter>? Chapters { get; set; }
    public virtual ICollection<Comment>? Comments { get; set; }
    public virtual ICollection<Rate>? Rates { get; set; }
    public virtual ICollection<Vote>? Votes { get; set; }

    public virtual ICollection<Gift>? Gifts { get; set; }
    public virtual ICollection<RatedA>? RatedAs { get; set; }
    public virtual ICollection<Tag>? Tags { get; set; }
}