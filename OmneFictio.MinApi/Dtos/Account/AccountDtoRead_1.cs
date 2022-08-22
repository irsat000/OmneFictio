
namespace OmneFictio.MinApi.Dtos;

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