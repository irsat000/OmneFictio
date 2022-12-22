using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class ExistingStory
    {
        public ExistingStory()
        {
            posts = new HashSet<Post>();
        }

        public int id { get; set; }
        public string body { get; set; } = null!;
        public int storyTypeId { get; set; }

        public virtual ExistingStoryType storyType { get; set; } = null!;

        public virtual ICollection<Post> posts { get; set; }
    }
}
