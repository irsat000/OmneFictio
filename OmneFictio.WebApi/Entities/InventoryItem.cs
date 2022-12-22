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
        public string code { get; set; } = null!;
        public string body { get; set; } = null!;
        public int itemValue { get; set; }

        public virtual ICollection<PostGift> PostGifts { get; set; }

        public virtual ICollection<Account> accounts { get; set; }
    }
}
