
namespace OmneFictio.WebApi.Dtos;
public partial class RequestDto
{
    public int id { get; set; }
    public int accountId { get; set; }
    public string title { get; set; } = null!;
    public string body { get; set; } = null!;
    public DateTime publishDate { get; set; }
    public virtual DeletedStatusDto? deletedStatus { get; set; }
}