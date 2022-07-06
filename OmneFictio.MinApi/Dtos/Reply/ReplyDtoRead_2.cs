using System;
using System.Collections.Generic;
using OmneFictio.MinApi.Dtos;

namespace OmneFictio.MinApi.Dtos
{
    public partial class ReplyDtoRead_2
    {
        public int Id { get; set; }
        public string Body { get; set; } = null!;
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual AccountDtoRead_1? Account { get; set; }
        public virtual DeletedStatusDto? DeletedStatus { get; set; }
        public virtual ICollection<VoteDto>? Votes { get; set; }
    }
}
