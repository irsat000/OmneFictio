using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class ExistingStoryType
    {
        public ExistingStoryType()
        {
            ExistingStories = new HashSet<ExistingStory>();
        }

        public int id { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<ExistingStory> ExistingStories { get; set; }
    }
}
