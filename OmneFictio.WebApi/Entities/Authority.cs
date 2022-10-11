using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Authority
    {
        public Authority()
        {
            accounts = new HashSet<Account>();
        }

        public int id { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<Account> accounts { get; set; }
    }
}
