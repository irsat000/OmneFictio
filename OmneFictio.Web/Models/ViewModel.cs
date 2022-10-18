
namespace OmneFictio.Web.Models;

public class IndexViewmodel
{
    
}
public class ReadViewmodel
{
    
}

public class GetpostViewmodel
{
    public int postid { get; set; }
    public GetpostViewmodel(int postid)
    {
        this.postid = postid;
    }
}