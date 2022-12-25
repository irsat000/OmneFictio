
namespace OmneFictio.WebApi.Dtos;
public partial class SavedPostDto
{
    public int targetPostId { get; set; }
}
public partial class SavedPostDtoWrite
{
    public int accountId { get; set; }
    public int targetPostId { get; set; }
    public DateTime saveDate { get; set; }
}
