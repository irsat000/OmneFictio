using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class PostType
{
    public byte id { get; set; }

    public string body { get; set; } = null!;

    public virtual ICollection<Post> Posts { get; } = new List<Post>();
}
