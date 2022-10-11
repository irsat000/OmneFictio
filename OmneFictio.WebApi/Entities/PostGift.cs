using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class PostGift
    {
        public int id { get; set; }
        public int? accountId { get; set; }
        public int? targetPostId { get; set; }
        public int? itemId { get; set; }
        public DateTime sentDate { get; set; }

        public virtual Account? account { get; set; }
        public virtual InventoryItem? item { get; set; }
        public virtual Post? targetPost { get; set; }
    }
}
