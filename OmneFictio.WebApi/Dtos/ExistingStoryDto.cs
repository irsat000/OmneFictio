
namespace OmneFictio.WebApi.Dtos;

public class ExistingStoryDto
{
    public string body { get; set; } = null!;
    public ExistingStoryTypeDto storyType { get; set; } = null!;
}