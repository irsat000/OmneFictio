
using OmneFictio.Web.PostReadModel;
namespace OmneFictio.Web.Models;

public class ReadViewmodel
{
    public List<PostRead1>? posts { get; set; }
}
public class IndexViewmodel
{
    /*public string? sessionUserId { get; set; }
    public string? sessionUsername { get; set; }*/
    public List<PostRead1>? posts { get; set; }
}

public class PostViewmodel
{
    public PostRead1? post { get; set; }
}