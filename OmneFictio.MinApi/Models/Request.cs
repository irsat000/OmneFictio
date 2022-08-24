using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Request
    {
        public int Id { get; set; }
        public int? AccountId { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }
        public DateTime PublishDate { get; set; }
        public byte? DeletedStatusId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual DeletedStatus? DeletedStatus { get; set; }
    }
}
