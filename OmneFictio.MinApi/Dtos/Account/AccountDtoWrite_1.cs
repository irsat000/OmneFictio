
namespace OmneFictio.MinApi.Dtos;

public partial class AccountDtoWrite_1
{
    public string Username { get; set; } = null!;
    public string Pw { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool? AllowSexual { get; set; }
    public bool? AllowViolence { get; set; }
    public int? PrefLanguageId { get; set; }
    //public virtual LanguageDto? PrefLanguage { get; set; }
}