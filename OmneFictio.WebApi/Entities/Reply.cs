using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Reply
{
    public int id { get; set; }

    public int? accountId { get; set; }

    public int commentId { get; set; }

    public string body { get; set; } = null!;

    public DateTime publishDate { get; set; }

    public DateTime updateDate { get; set; }

    public byte? deletedStatusId { get; set; }

    public virtual ICollection<Vote> Votes { get; } = new List<Vote>();

    public virtual Account? account { get; set; }

    public virtual Comment comment { get; set; } = null!;

    public virtual DeletedStatus? deletedStatus { get; set; }
}
