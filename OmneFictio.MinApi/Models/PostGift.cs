using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class PostGift
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? TargetPostId { get; set; }
        public int? ItemId { get; set; }
        public DateTime SentDate { get; set; }

        public virtual Account? Account { get; set; }
        public virtual InventoryItem? Item { get; set; }
        public virtual Post? TargetPost { get; set; }
    }
}
