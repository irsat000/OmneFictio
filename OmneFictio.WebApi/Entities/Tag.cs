using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Tag
    {
        public Tag()
        {
            posts = new HashSet<Post>();
        }

        public int id { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<Post> posts { get; set; }
    }
}
