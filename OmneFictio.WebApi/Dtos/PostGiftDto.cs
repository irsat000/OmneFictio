﻿
namespace OmneFictio.WebApi.Dtos;
public partial class PostGiftDto
{
    public DateTime SentDate { get; set; }
    public InventoryItemDto? Item { get; set; }
}