namespace OmneFictio.MinApi.Models;

public class CheckVoted
{
    public int UserId { get; set; }
    public int TargetId { get; set; }
    public string TargetType { get; set; }
}