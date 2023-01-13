using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class SavedPost
{
    public int id { get; set; }

    public int accountId { get; set; }

    public int targetPostId { get; set; }

    public DateTime saveDate { get; set; }

    public virtual Account account { get; set; } = null!;

    public virtual Post targetPost { get; set; } = null!;
}
