using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class ExistingStoryType
    {
        public ExistingStoryType()
        {
            ExistingStories = new HashSet<ExistingStory>();
        }

        public int Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<ExistingStory> ExistingStories { get; set; }
    }
}
