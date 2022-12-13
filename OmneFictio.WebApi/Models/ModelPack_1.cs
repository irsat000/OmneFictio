namespace OmneFictio.WebApi.Models;

public class CheckVoted
{
    public int accountId { get; set; }
    public int targetId { get; set; }
    public string? targetType { get; set; }
}

public class RateInfo : CheckRateInfo
{
    public int rateValue { get; set; }
}
public class CheckRateInfo
{
    public int accountId { get; set; }
    public int postId { get; set; }
}