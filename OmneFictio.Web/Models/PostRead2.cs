using OmneFictio.Web.PostReadModel;

namespace OmneFictio.Web.PostReadModel2;

public class PostRead2 : PostRead1
{
    public new List<Chapter> chapters { get; set; }
    public new List<Comment> comments { get; set; }
}

public class Chapter
{
    public int id { get; set; }
    public string title { get; set; }
    public int chapterIndex { get; set; }
    public bool isPublished { get; set; }
}

public class Comment
{
    public int id { get; set; }
    public string body { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Reply> replies { get; set; }
    public List<Vote> votes { get; set; }
    public int voteResult { get; set; }
}
