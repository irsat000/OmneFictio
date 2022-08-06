
namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoWrite_3 : AccountDtoWrite_2
{
    public string Username { get; set; } = null!;
    public string? Pw { get; set; }
    public bool? AllowSexual { get; set; }
    public bool? AllowViolence { get; set; }
    public int? PrefLanguageId { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfilePic { get; set; }
}
//External registration (full)