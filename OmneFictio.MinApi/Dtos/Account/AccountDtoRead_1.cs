using System;
using System.Collections.Generic;
using OmneFictio.MinApi.Dtos;

namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoRead_1
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string? DisplayName { get; set; }
    public string? ProfilePic { get; set; }
    public string? SelfDesc { get; set; }

    public virtual DeletedStatusDto? DeletedStatus { get; set; }
    public virtual ICollection<AuthorityDto>? Authorities { get; set; }
}
//Post's owner