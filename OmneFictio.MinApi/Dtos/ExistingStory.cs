using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Dtos;

public class ExistingStoryDto
{
        public string Body { get; set; } = null!;
        public string? FirstLetter { get; set; }
        public virtual StoryTypeDto? StoryType { get; set; }
}