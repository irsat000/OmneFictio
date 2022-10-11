using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class ChatMessage
    {
        public int id { get; set; }
        public int? accountId { get; set; }
        public int? targetAccountId { get; set; }
        public string body { get; set; } = null!;
        public DateTime sentDate { get; set; }

        public virtual Account? account { get; set; }
        public virtual Account? targetAccount { get; set; }
    }
}
