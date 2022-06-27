using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class PostType
    {
        public PostType()
        {
            Posts = new HashSet<Post>();
        }

        public byte Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
    }
}
