using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Comment
    {
        public Comment()
        {
            Replies = new HashSet<Reply>();
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public int? AccountId { get; set; }
        public string Body { get; set; } = null!;
        public byte? DeletedStatusId { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int? TargetPostId { get; set; }
        public int? TargetChapterId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual DeletedStatus? DeletedStatus { get; set; }
        public virtual Chapter? TargetChapter { get; set; }
        public virtual Post? TargetPost { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
