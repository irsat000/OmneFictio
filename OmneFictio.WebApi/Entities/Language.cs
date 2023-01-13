using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Language
{
    public int id { get; set; }

    public string lanCode { get; set; } = null!;

    public string body { get; set; } = null!;

    public virtual ICollection<Post> Posts { get; } = new List<Post>();

    public virtual ICollection<Preference> PreferenceprefLanguageId_2Navigations { get; } = new List<Preference>();

    public virtual ICollection<Preference> PreferenceprefLanguages { get; } = new List<Preference>();
}
