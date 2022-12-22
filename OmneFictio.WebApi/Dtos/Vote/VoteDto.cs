
namespace OmneFictio.WebApi.Dtos;
public partial class VoteDto
{
    public int accountId { get; set; }
    public bool body { get; set; }
}

public partial class VoteDtoWrite_1
{
    public int accountId { get; set; }
    public bool body { get; set; }
    public int targetId { get; set; }
    public string targetType { get; set; } = null!;
}
