using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Tag
{
    public int id { get; set; }

    public string body { get; set; } = null!;

    public bool userGenerated { get; set; }

    public virtual ICollection<Post> posts { get; } = new List<Post>();
}
