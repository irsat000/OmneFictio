﻿using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class InventoryItem
    {
        public InventoryItem()
        {
            PostGifts = new HashSet<PostGift>();
            Accounts = new HashSet<Account>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<PostGift> PostGifts { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
