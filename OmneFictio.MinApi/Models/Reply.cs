using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Reply
    {
        public Reply()
        {
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public int? AccountId { get; set; }
        public int? CommentId { get; set; }
        public string Body { get; set; } = null!;
        public byte? DeletedStatusId { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Comment? Comment { get; set; }
        public virtual DeletedStatus? DeletedStatus { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
