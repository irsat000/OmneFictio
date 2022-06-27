using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class AccountAuthority
    {
        public int? AccountId { get; set; }
        public int? AuthorityId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Authority? Authority { get; set; }
    }
}
