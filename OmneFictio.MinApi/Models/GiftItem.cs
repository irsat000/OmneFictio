using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class GiftItem
    {
        public GiftItem()
        {
            Gifts = new HashSet<Gift>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Gift> Gifts { get; set; }
    }
}
