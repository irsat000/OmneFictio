using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class AccountThemeSelections_MM
{
    public int accountId { get; set; }

    public int themeId { get; set; }

    public bool? themeSelected { get; set; }

    public virtual Account account { get; set; } = null!;

    public virtual Theme theme { get; set; } = null!;
}
