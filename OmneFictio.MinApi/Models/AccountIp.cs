using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class AccountIp
    {
        public int? AccountId { get; set; }
        public int? IpId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Ip? Ip { get; set; }
    }
}
