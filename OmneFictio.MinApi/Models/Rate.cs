using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Rate
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? PostId { get; set; }
        public double Rate1 { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Post? Post { get; set; }
    }
}
