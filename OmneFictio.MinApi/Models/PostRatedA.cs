using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class PostRatedA
    {
        public int? PostId { get; set; }
        public int? RatedAsId { get; set; }

        public virtual Post? Post { get; set; }
        public virtual RatedA? RatedAs { get; set; }
    }
}
