using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Theme
    {
        public Theme()
        {
            AccountThemeSelections_MMs = new HashSet<AccountThemeSelections_MM>();
        }

        public int id { get; set; }
        public string code { get; set; } = null!;
        public string title { get; set; } = null!;
        public string themeDescription { get; set; } = null!;

        public virtual ICollection<AccountThemeSelections_MM> AccountThemeSelections_MMs { get; set; }
    }
}
