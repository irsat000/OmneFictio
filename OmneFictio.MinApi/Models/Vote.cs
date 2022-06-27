using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Vote
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public bool Vote1 { get; set; }
        public int? TargetPostId { get; set; }
        public int? TargetChapterId { get; set; }
        public int? TargetCommentId { get; set; }
        public int? TargetReplyId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Chapter? TargetChapter { get; set; }
        public virtual Comment? TargetComment { get; set; }
        public virtual Post? TargetPost { get; set; }
        public virtual Reply? TargetReply { get; set; }
    }
}
