using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Chapter
{
    public int id { get; set; }

    public string title { get; set; } = null!;

    public int postId { get; set; }

    public string body { get; set; } = null!;

    public string? authorNotePrior { get; set; }

    public string? authorNoteLater { get; set; }

    public int chapterIndex { get; set; }

    public DateTime publishDate { get; set; }

    public DateTime updateDate { get; set; }

    public bool isPublished { get; set; }

    public byte? deletedStatusId { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<Vote> Votes { get; } = new List<Vote>();

    public virtual DeletedStatus? deletedStatus { get; set; }

    public virtual Post post { get; set; } = null!;
}
