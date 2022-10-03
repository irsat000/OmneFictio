namespace OmneFictio.MinApi.Models;

public class CheckVoted
{
    public int AccountId { get; set; }
    public int TargetId { get; set; }
    public string TargetType { get; set; }
}

public class RateInfo
{
    public int AccountId { get; set; }
    public int PostId { get; set; }
    public int RateValue { get; set; }
}