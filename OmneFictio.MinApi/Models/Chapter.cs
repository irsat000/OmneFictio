using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Chapter
    {
        public Chapter()
        {
            Comments = new HashSet<Comment>();
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public int? PostId { get; set; }
        public string? Body { get; set; }
        public int? ChapterIndex { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool? IsPublished { get; set; }
        public string? Title { get; set; }

        public virtual Post? Post { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
