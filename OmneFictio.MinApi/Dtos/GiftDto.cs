using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Dtos
{
    public partial class GiftDto
    {
        public virtual GiftItemDto? GiftItem { get; set; }
    }
}
