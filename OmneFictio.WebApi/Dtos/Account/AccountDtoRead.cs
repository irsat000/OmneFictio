
namespace OmneFictio.WebApi.Dtos;

public partial class AccountDtoRead_1
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string? DisplayName { get; set; }
    public string? ProfilePic { get; set; }
    public string? SelfDesc { get; set; }

    public DeletedStatusDto? DeletedStatus { get; set; }
    public ICollection<AuthorityDto>? Authorities { get; set; }
}
//Post's owner

public partial class AccountDtoRead_2
{
    public string Username { get; set; } = null!;
    public string? Pw { get; set; }
}
//Authentication

public partial class AccountDtoRead_3
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string? Pw { get; set; }
    public string Email { get; set; } = null!;
}
//After authentication, map user

public partial class AccountDtoRead_4
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? ProfilePic { get; set; }
}
//For creating jwt