using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class PostGift
    {
        public int? PostId { get; set; }
        public int? GiftId { get; set; }

        public virtual Gift? Gift { get; set; }
        public virtual Post? Post { get; set; }
    }
}
