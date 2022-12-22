
namespace OmneFictio.WebApi.Dtos;

public class InventoryItemDto
{
    public string code { get; set; } = null!;
    public string body { get; set; } = null!;
    public int itemValue { get; set; }
}