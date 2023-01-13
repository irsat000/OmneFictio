using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class FollowedUser
{
    public int id { get; set; }

    public int accountId { get; set; }

    public int targetAccountId { get; set; }

    public virtual Account account { get; set; } = null!;

    public virtual Account targetAccount { get; set; } = null!;
}
