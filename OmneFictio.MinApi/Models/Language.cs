using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Language
    {
        public Language()
        {
            Accounts = new HashSet<Account>();
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string? LanCode { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
