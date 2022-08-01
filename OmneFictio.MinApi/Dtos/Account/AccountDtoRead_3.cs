using System;
using System.Collections.Generic;
using OmneFictio.MinApi.Dtos;

namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoRead_3
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? ProfilePic { get; set; }
    
    public virtual ICollection<AuthorityDto>? Authorities { get; set; }
}