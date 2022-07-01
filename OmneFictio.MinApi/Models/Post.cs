using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Post
    {
        public Post()
        {
            Chapters = new HashSet<Chapter>();
            Comments = new HashSet<Comment>();
            Rates = new HashSet<Rate>();
            Votes = new HashSet<Vote>();
            RatedAs = new HashSet<RatedA>();
            Tags = new HashSet<Tag>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string PostDescription { get; set; } = null!;
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public byte? DeletedStatusId { get; set; }
        public byte? PostStatusId { get; set; }
        public byte? PostTypeId { get; set; }
        public int? LanguageId { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual DeletedStatus? DeletedStatus { get; set; }
        public virtual Language? Language { get; set; }
        public virtual PostStatus? PostStatus { get; set; }
        public virtual PostType? PostType { get; set; }
        public virtual ICollection<Chapter> Chapters { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<RatedA> RatedAs { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
    }
}
