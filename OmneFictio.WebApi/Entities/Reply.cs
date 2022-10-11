using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Reply
    {
        public Reply()
        {
            Votes = new HashSet<Vote>();
        }

        public int id { get; set; }
        public int? accountId { get; set; }
        public int? commentId { get; set; }
        public string body { get; set; } = null!;
        public byte? deletedStatusId { get; set; }
        public DateTime publishDate { get; set; }
        public DateTime updateDate { get; set; }

        public virtual Account? account { get; set; }
        public virtual Comment? comment { get; set; }
        public virtual DeletedStatus? deletedStatus { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
