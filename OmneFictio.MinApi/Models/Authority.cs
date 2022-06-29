using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Authority
    {
        public Authority()
        {
            Accounts = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
