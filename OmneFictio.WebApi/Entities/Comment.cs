using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Comment
{
    public int id { get; set; }

    public int? accountId { get; set; }

    public string body { get; set; } = null!;

    public DateTime publishDate { get; set; }

    public DateTime updateDate { get; set; }

    public int? targetPostId { get; set; }

    public int? targetChapterId { get; set; }

    public byte? deletedStatusId { get; set; }

    public virtual ICollection<Reply> Replies { get; } = new List<Reply>();

    public virtual ICollection<Vote> Votes { get; } = new List<Vote>();

    public virtual Account? account { get; set; }

    public virtual DeletedStatus? deletedStatus { get; set; }

    public virtual Chapter? targetChapter { get; set; }

    public virtual Post? targetPost { get; set; }
}
