using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class InventoryItem
    {
        public InventoryItem()
        {
            PostGifts = new HashSet<PostGift>();
            accounts = new HashSet<Account>();
        }

        public int id { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<PostGift> PostGifts { get; set; }

        public virtual ICollection<Account> accounts { get; set; }
    }
}
