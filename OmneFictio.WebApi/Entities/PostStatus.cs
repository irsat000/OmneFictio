using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class PostStatus
    {
        public PostStatus()
        {
            Posts = new HashSet<Post>();
        }

        public byte id { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
    }
}
