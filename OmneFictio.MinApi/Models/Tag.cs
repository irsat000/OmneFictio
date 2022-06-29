using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Tag
    {
        public Tag()
        {
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
    }
}
