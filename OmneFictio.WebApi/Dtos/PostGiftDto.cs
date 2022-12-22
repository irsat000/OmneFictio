
namespace OmneFictio.WebApi.Dtos;
public partial class PostGiftDto
{
    public DateTime sentDate { get; set; }
    public InventoryItemDto? inventoryItem { get; set; }
}