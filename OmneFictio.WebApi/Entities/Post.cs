using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Post
    {
        public Post()
        {
            Chapters = new HashSet<Chapter>();
            Comments = new HashSet<Comment>();
            PostGifts = new HashSet<PostGift>();
            Rates = new HashSet<Rate>();
            Votes = new HashSet<Vote>();
            existingStories = new HashSet<ExistingStory>();
            tags = new HashSet<Tag>();
        }

        public int id { get; set; }
        public string title { get; set; } = null!;
        public string postDescription { get; set; } = null!;
        public string? coverImage { get; set; }
        public DateTime publishDate { get; set; }
        public DateTime updateDate { get; set; }
        public byte? deletedStatusId { get; set; }
        public byte? postStatusId { get; set; }
        public byte? postTypeId { get; set; }
        public int? ratedAsId { get; set; }
        public int? languageId { get; set; }
        public int? accountId { get; set; }
        public bool? isPublished { get; set; }

        public virtual Account? account { get; set; }
        public virtual DeletedStatus? deletedStatus { get; set; }
        public virtual Language? language { get; set; }
        public virtual PostStatus? postStatus { get; set; }
        public virtual PostType? postType { get; set; }
        public virtual RatedA? ratedAs { get; set; }
        public virtual ICollection<Chapter> Chapters { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<PostGift> PostGifts { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<ExistingStory> existingStories { get; set; }
        public virtual ICollection<Tag> tags { get; set; }
    }
}
