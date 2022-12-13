
namespace OmneFictio.WebApi.Dtos;

public partial class AccountDtoWrite_1
{
    public string Username { get; set; } = null!;
    public string? Pw { get; set; }
    public string Email { get; set; } = null!;
    public string? ExternalType { get; set; }
    public bool? AllowAdultContent { get; set; }
    public int? PrefLanguageId { get; set; }
}
//Normal registration