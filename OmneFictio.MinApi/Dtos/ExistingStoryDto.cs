
namespace OmneFictio.MinApi.Dtos;

public class ExistingStoryDto
{
        public string Body { get; set; } = null!;
        public virtual ExistingStoryTypeDto? StoryType { get; set; }
}