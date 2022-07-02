using System;
using System.Collections.Generic;
using OmneFictio.MinApi.Models;

namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoRead_1
{
    public string Username { get; set; } = null!;
    public string? ProfilePic { get; set; }
    public string? SelfDesc { get; set; }
    public byte? DeletedStatusId { get; set; }

    public virtual DeletedStatusDto? DeletedStatus { get; set; }
    public virtual LanguageDto? PrefLanguage { get; set; }
    public virtual ICollection<AuthorityDto>? Authorities { get; set; }
}