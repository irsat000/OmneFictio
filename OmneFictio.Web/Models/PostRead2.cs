namespace OmneFictio.Web.PostReadModel;


public class PostRead2 : PostRead1
{
    public List<Chapter2> chapters { get; set; }
    public List<Comment2> comments { get; set; }
}

public class Comment2
{
    public int id { get; set; }
    public string body { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Reply> replies { get; set; }
    public List<Vote> votes { get; set; }
}
public class Reply2
{
    public int id { get; set; }
    public string body { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Vote> votes { get; set; }
}


public class Chapter2
{
    public int id { get; set; }
    public string title { get; set; }
    public int chapterIndex { get; set; }
    public bool isPublished { get; set; }
}