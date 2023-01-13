using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Post
{
    public int id { get; set; }

    public int? accountId { get; set; }

    public string title { get; set; } = null!;

    public string postDescription { get; set; } = null!;

    public string? coverImage { get; set; }

    public DateTime publishDate { get; set; }

    public DateTime updateDate { get; set; }

    public byte? deletedStatusId { get; set; }

    public byte postStatusId { get; set; }

    public byte postTypeId { get; set; }

    public int ratedAsId { get; set; }

    public int languageId { get; set; }

    public bool isPublished { get; set; }

    public virtual ICollection<Chapter> Chapters { get; } = new List<Chapter>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<PostGift> PostGifts { get; } = new List<PostGift>();

    public virtual ICollection<Rate> Rates { get; } = new List<Rate>();

    public virtual ICollection<SavedPost> SavedPosts { get; } = new List<SavedPost>();

    public virtual ICollection<Vote> Votes { get; } = new List<Vote>();

    public virtual Account? account { get; set; }

    public virtual DeletedStatus? deletedStatus { get; set; }

    public virtual Language language { get; set; } = null!;

    public virtual PostStatus postStatus { get; set; } = null!;

    public virtual PostType postType { get; set; } = null!;

    public virtual RatedA ratedAs { get; set; } = null!;

    public virtual ICollection<ExistingStory> existingStories { get; } = new List<ExistingStory>();

    public virtual ICollection<Tag> tags { get; } = new List<Tag>();
}
