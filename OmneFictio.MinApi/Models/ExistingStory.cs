using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class ExistingStory
    {
        public ExistingStory()
        {
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public string? FirstLetter { get; set; }
        public int? StoryTypeId { get; set; }

        public virtual StoryType? StoryType { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
