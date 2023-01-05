using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Language
    {
        public Language()
        {
            Posts = new HashSet<Post>();
            PreferenceprefLanguageId_2Navigations = new HashSet<Preference>();
            PreferenceprefLanguages = new HashSet<Preference>();
        }

        public int id { get; set; }
        public string lanCode { get; set; } = null!;
        public string body { get; set; } = null!;

        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Preference> PreferenceprefLanguageId_2Navigations { get; set; }
        public virtual ICollection<Preference> PreferenceprefLanguages { get; set; }
    }
}
