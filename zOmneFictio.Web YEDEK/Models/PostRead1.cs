// Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
namespace OmneFictio.Web.PostReadModel;


public class Account
{
    public int id { get; set; }
    public string username { get; set; }
    public string displayName { get; set; }
    public string profilePic { get; set; }
    public string selfDesc { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Authority> authorities { get; set; }
}

public class Authority
{
    public string body { get; set; }
}

public class Chapter
{
    public int id { get; set; }
    public string title { get; set; }
    public int chapterIndex { get; set; }
    public bool isPublished { get; set; }
}

public class DeletedStatus
{
    public string body { get; set; }
}

public class ExistingStory
{
    public string body { get; set; }
    public StoryType storyType { get; set; }
}

public class Item
{
    public string body { get; set; }
}

public class Language
{
    public string lanCode { get; set; }
    public string body { get; set; }
}

public class PostGift
{
    public DateTime sentDate { get; set; }
    public Item item { get; set; }
}

public class PostStatus
{
    public string body { get; set; }
}

public class PostType
{
    public string body { get; set; }
}

public class Rate
{
    public double body { get; set; }
}

public class RatedAs
{
    public string body { get; set; }
}

public class PostRead1
{
    public int id { get; set; }
    public string title { get; set; }
    public string postDescription { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public string coverImage { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public Language language { get; set; }
    public PostStatus postStatus { get; set; }
    public PostType postType { get; set; }
    public RatedAs ratedAs { get; set; }
    public List<Chapter> chapters { get; set; }
    public List<PostGift> postGifts { get; set; }
    public List<Rate> rates { get; set; }
    public List<Vote> votes { get; set; }
    public List<Tag> tags { get; set; }
    public List<ExistingStory> existingStories { get; set; }
    public int voteResult { get; set; }
    public double rateResult { get; set; }
}

public class StoryType
{
    public string body { get; set; }
}

public class Tag
{
    public int id { get; set; }
    public string body { get; set; }
}

public class Vote
{
    public int accountId { get; set; }
    public bool body { get; set; }
}







































/*
public class Account
{
    public int id { get; set; }
    public string username { get; set; }
    public string displayName { get; set; }
    public string profilePic { get; set; }
    public string selfDesc { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public List<Authority> authorities { get; set; }
}

public class Authority
{
    public string body { get; set; }
}

public class Chapter
{
    public int id { get; set; }
}

public class Comment
{
    public int id { get; set; }
    public List<Reply> replies { get; set; }
}

public class DeletedStatus
{
    public string body { get; set; }
}

public class ExistingStory
{
    public string body { get; set; }
    public StoryType storyType { get; set; }
}

public class Gift
{
    public DateTime sentDate { get; set; }
    public Item item { get; set; }
}

public class Item
{
    public string body { get; set; }
}

public class Language
{
    public string lanCode { get; set; }
    public string body { get; set; }
}

public class PostStatus
{
    public string body { get; set; }
}

public class PostType
{
    public string body { get; set; }
}

public class Rate
{
    public double body { get; set; }
}

public class RatedAs
{
    public string body { get; set; }
}

public class Reply
{
    public int id { get; set; }
}

public class PostRead1
{
    public int id { get; set; }
    public string title { get; set; }
    public string postDescription { get; set; }
    public DateTime publishDate { get; set; }
    public DateTime updateDate { get; set; }
    public string coverImage { get; set; }
    public Account account { get; set; }
    public DeletedStatus deletedStatus { get; set; }
    public Language language { get; set; }
    public PostStatus postStatus { get; set; }
    public PostType postType { get; set; }
    public RatedAs ratedAs { get; set; }
    public List<Chapter> chapters { get; set; }
    public List<Comment> comments { get; set; }
    public List<Gift> gifts { get; set; }
    public List<Rate> rates { get; set; }
    public List<Vote> votes { get; set; }
    public List<Tag> tags { get; set; }
    public List<ExistingStory> existingStories { get; set; }
    public int voteResult { get; set; }
    public double rateResult { get; set; }
}

public class StoryType
{
    public string body { get; set; }
}

public class Tag
{
    public int id { get; set; }
    public string body { get; set; }
}

public class Vote
{
    public int accountId { get; set; }
    public bool body { get; set; }
}




*/























