using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class PostGift
    {
        public int id { get; set; }
        public int accountId { get; set; }
        public int targetPostId { get; set; }
        public int inventoryItemId { get; set; }
        public DateTime sentDate { get; set; }

        public virtual Account account { get; set; } = null!;
        public virtual InventoryItem inventoryItem { get; set; } = null!;
        public virtual Post targetPost { get; set; } = null!;
    }
}
