using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Language
    {
        public Language()
        {
            Accounts = new HashSet<Account>();
            Posts = new HashSet<Post>();
        }

        public int id { get; set; }
        public string? lanCode { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
