using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class ChatMessage
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? TargetAccountId { get; set; }
        public string Body { get; set; } = null!;
        public DateTime SentDate { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Account? TargetAccount { get; set; }
    }
}
