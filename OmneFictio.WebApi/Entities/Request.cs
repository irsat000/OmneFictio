using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Request
    {
        public int id { get; set; }
        public int accountId { get; set; }
        public string title { get; set; } = null!;
        public string body { get; set; } = null!;
        public DateTime publishDate { get; set; }
        public byte? deletedStatusId { get; set; }

        public virtual Account account { get; set; } = null!;
        public virtual DeletedStatus? deletedStatus { get; set; }
    }
}
