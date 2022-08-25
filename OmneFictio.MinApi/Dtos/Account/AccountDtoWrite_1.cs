
namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoWrite_1
{
    public string Username { get; set; } = null!;
    public string? Pw { get; set; }
    public string Email { get; set; } = null!;
    public bool? AllowAdultContent { get; set; }
    public int? PrefLanguageId { get; set; }
    public string? ExternalType { get; set; }
}
//Normal registration