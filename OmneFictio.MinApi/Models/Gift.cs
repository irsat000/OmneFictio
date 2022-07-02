using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Gift
    {
        public int Id { get; set; }
        public int? GiftItemId { get; set; }
        public int? AccountId { get; set; }
        public int? TargetPostId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual GiftItem? GiftItem { get; set; }
        public virtual Post? TargetPost { get; set; }
    }
}
