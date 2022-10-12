
using OmneFictio.Web.PostReadModel;
namespace OmneFictio.Web.Models;

public class IndexViewmodel
{
    /*public string? sessionUserId { get; set; }
    public string? sessionUsername { get; set; }*/
    //public List<PostRead1>? posts { get; set; }
}
public class ReadViewmodel
{
    //public List<PostRead1>? posts { get; set; }
}

public class GetpostViewmodel
{
    public PostRead1 post { get; set; }
    public GetpostViewmodel(PostRead1 post)
    {
        this.post = post;
    }
}