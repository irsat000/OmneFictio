
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
    public string? LastReadPage { get; set; }
    public GetpostViewmodel(int postid, string? LastReadPage)
    {
        this.postid = postid;
        this.LastReadPage = LastReadPage;
    }
}