
namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoRead_3
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string? Pw { get; set; }
    public string Email { get; set; } = null!;
}
//After authentication, map user