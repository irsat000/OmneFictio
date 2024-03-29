
namespace OmneFictio.WebApi.Dtos;



//GET



public partial class AccountDtoRead_1
{
    public int id { get; set; }
    public string username { get; set; } = null!;
    public string? displayName { get; set; }
    public string? profilePic { get; set; }
    public string? selfDesc { get; set; }

    public DeletedStatusDto? deletedStatus { get; set; }
    public ICollection<AuthorityDto>? authorities { get; set; }
}
//Post's owner

public partial class AccountDtoRead_2
{
    public string username { get; set; } = null!;
    public string pw { get; set; } = null!;
}
//Authentication

public partial class AccountDtoRead_4
{
    public int id { get; set; }
    public string username { get; set; } = null!;
    public virtual ICollection<PreferenceDto> Preferences { get; set; } = null!;
} //Might be necessary


public partial class AccountDtoRead_3
{
    public int id { get; set; }
    public string username { get; set; } = null!;
    public string? displayName { get; set; }
    public string? profilePic { get; set; }
    public string? selfDesc { get; set; }
    public DeletedStatusDto? deletedStatus { get; set; }
    public ICollection<AuthorityDto>? authorities { get; set; }

    //user stats
    public int stat_reputation { get; set; } = 0;
    public int stat_follows { get; set; } = 0;
    public int stat_giftsReceived { get; set; } = 0;
    //post stats
    public int stat_likes { get; set; } = 0;
    public int stat_saved { get; set; } = 0;
    public int stat_postsPublished { get; set; } = 0;
    //If it's the user's own profile (must be nullable)
    public bool ownProfile { get; set; }
    public string? email { get; set; }
    public bool? emailValid { get; set; }
    public int? gold { get; set; }
    //extra
    public bool isNSFW { get; set; }
}
//To get the profile details


public class AccountDto_Settings
{
    public int id { get; set; }

    public string username { get; set; } = null!;

    public string email { get; set; } = null!;

    public bool emailValid { get; set; }

    public string? displayName { get; set; }

    public string? profilePic { get; set; }

    public string? selfDesc { get; set; }
}
//For account settings



//WRITE

public class Account_Update_Settings
{
    public int id { get; set; }
    public string? displayName { get; set; }
    public string? selfDesc { get; set; }
    public string? profilePic { get; set; }
}

public class Account_Create
{
    public string username { get; set; } = null!;
    public string pw { get; set; } = null!;
    public string email { get; set; } = null!;
    public object? allowAdultContent { get; set; } //bool
    public object? prefLanguageId { get; set; } //int
}