
namespace OmneFictio.WebApi.Dtos;

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
    public string? pw { get; set; }
}
//Authentication



public partial class AccountDtoRead_3
{
    public int id { get; set; }
    public string username { get; set; } = null!;
    public string? displayName { get; set; }
    public string? profilePic { get; set; }
    public string? selfDesc { get; set; }
    public byte? deletedStatusId { get; set; }
    public ICollection<AuthorityDto>? authorities { get; set; }

    //user stats
    public int stat_reputation { get; set; } = 0;
    public int stat_follows { get; set; } = 0;
    public int stat_giftsReceived { get; set; } = 0;
    //post stats
    public int stat_likes { get; set; } = 0;
    public int stat_saved { get; set; } = 0;
    public int stat_postsPublished { get; set; } = 0;
    //If it's the user's own profile
    public string? email { get; set; } = null!;
    public bool? emailValid { get; set; }
    public int? gold { get; set; }
}
//To get the profile details