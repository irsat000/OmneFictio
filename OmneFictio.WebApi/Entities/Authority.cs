using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Authority
{
    public int id { get; set; }

    public string code { get; set; } = null!;

    public string body { get; set; } = null!;

    public virtual ICollection<Account> accounts { get; } = new List<Account>();
}
