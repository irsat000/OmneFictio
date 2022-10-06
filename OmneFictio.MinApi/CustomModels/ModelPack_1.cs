namespace OmneFictio.MinApi.Models;

public class GetPosts_Options
{
    public int Page { get; set; }
    public int MaxPostPerPage { get; set; }
}


public class CheckVoted
{
    public int AccountId { get; set; }
    public int TargetId { get; set; }
    public string TargetType { get; set; }
}

public class RateInfo : CheckRateInfo
{
    public int RateValue { get; set; }
}
public class CheckRateInfo
{
    public int AccountId { get; set; }
    public int PostId { get; set; }
}