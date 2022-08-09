
namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoRead_4
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? ProfilePic { get; set; }
}
//For creating jwt