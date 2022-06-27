using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Authority
    {
        public int Id { get; set; }
        public string Body { get; set; } = null!;
    }
}
