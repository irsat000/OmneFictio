
namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoWrite_2
{
    public string Email { get; set; } = null!;
    public string? ExternalId { get; set; }
    public string? ExternalType { get; set; }
}
//External registration (class from request)