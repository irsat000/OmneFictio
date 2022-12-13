using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Language
    {
        public Language()
        {
            Posts = new HashSet<Post>();
        }

        public int id { get; set; }
        public string? lanCode { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
    }
}
