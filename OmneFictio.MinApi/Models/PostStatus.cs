using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class PostStatus
    {
        public PostStatus()
        {
            Posts = new HashSet<Post>();
        }

        public byte Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
    }
}
