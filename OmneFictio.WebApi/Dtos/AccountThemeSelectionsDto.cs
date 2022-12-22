
namespace OmneFictio.WebApi.Dtos;
public partial class AccountThemeSelectionsDto
{
    public bool? themeSelected { get; set; } //Might not be necessary
    public ThemeDto theme { get; set; } = null!;
}

