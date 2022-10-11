using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Request
    {
        public int id { get; set; }
        public int? accountId { get; set; }
        public string? title { get; set; }
        public string? body { get; set; }
        public DateTime publishDate { get; set; }
        public byte? deletedStatusId { get; set; }

        public virtual Account? account { get; set; }
        public virtual DeletedStatus? deletedStatus { get; set; }
    }
}
