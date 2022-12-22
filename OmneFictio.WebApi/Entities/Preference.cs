using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Preference
    {
        public int id { get; set; }
        public int accountId { get; set; }
        public bool? allowAdultContent { get; set; }
        public byte? accountCardMode { get; set; }
        public bool? postsMasonryDesign { get; set; }
        public int? prefLanguageId { get; set; }
        public int? prefLanguageId_2 { get; set; }

        public virtual Account account { get; set; } = null!;
        public virtual Language? prefLanguage { get; set; }
        public virtual Language? prefLanguageId_2Navigation { get; set; }
    }
}
