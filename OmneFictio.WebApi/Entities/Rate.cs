using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Rate
{
    public int id { get; set; }

    public int accountId { get; set; }

    public int postId { get; set; }

    public byte body { get; set; }

    public virtual Account account { get; set; } = null!;

    public virtual Post post { get; set; } = null!;
}
