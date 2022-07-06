using System;
using System.Collections.Generic;
using OmneFictio.MinApi.Dtos;

namespace OmneFictio.MinApi.Dtos
{
    public partial class CommentDtoRead_2
    {
        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual AccountDtoRead_1? Account { get; set; }
        public virtual DeletedStatusDto? DeletedStatus { get; set; }
        public virtual ChapterDtoRead_1? TargetChapter { get; set; }
        public virtual PostDtoRead_2? TargetPost { get; set; }
        public virtual ICollection<ReplyDtoRead_2>? Replies { get; set; }
        public virtual ICollection<VoteDto>? Votes { get; set; }
    }
}
