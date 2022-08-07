
namespace OmneFictio.MinApi.Dtos
{
    public partial class PostGiftDto
    {
        public DateTime SentDate { get; set; }
        public virtual InventoryItemDto? Item { get; set; }
    }
}
