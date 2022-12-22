using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class AccountIP
    {
        public int id { get; set; }
        public int accountId { get; set; }
        public string body { get; set; } = null!;

        public virtual Account account { get; set; } = null!;
    }
}
