// Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
    namespace Models;
    public class Account
    {
        public int id { get; set; }
        public string username { get; set; }
        public string profilePic { get; set; }
        public string selfDesc { get; set; }
        public DeletedStatus deletedStatus { get; set; }
        public List<object> authorities { get; set; }
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
        public double rate1 { get; set; }
    }

    public class PostRead1
    {
        public int id { get; set; }
        public string title { get; set; }
        public string postDescription { get; set; }
        public DateTime publishDate { get; set; }
        public DateTime updateDate { get; set; }
        public Account account { get; set; }
        public DeletedStatus deletedStatus { get; set; }
        public Language language { get; set; }
        public PostStatus postStatus { get; set; }
        public PostType postType { get; set; }
        public List<object> chapters { get; set; }
        public List<object> comments { get; set; }
        public object gifts { get; set; }
        public List<Rate> rates { get; set; }
        public List<Vote> votes { get; set; }
        public List<object> ratedAs { get; set; }
        public List<Tag> tags { get; set; }
        public List<ExistingStory> existingStories { get; set; }
    }

    public class StoryType
    {
        public string body { get; set; }
    }

    public class Tag
    {
        public string body { get; set; }
    }

    public class Vote
    {
        public bool vote1 { get; set; }
    }





























// Generated by https://quicktype.io
/*
namespace QuickType
{
    using System;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    public partial class PostRead1
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("postDescription")]
        public string PostDescription { get; set; }

        [JsonProperty("publishDate")]
        public DateTimeOffset PublishDate { get; set; }

        [JsonProperty("updateDate")]
        public DateTimeOffset UpdateDate { get; set; }

        [JsonProperty("account")]
        public Account Account { get; set; }

        [JsonProperty("deletedStatus")]
        public DeletedStatus DeletedStatus { get; set; }

        [JsonProperty("language")]
        public Language Language { get; set; }

        [JsonProperty("postStatus")]
        public DeletedStatus PostStatus { get; set; }

        [JsonProperty("postType")]
        public DeletedStatus PostType { get; set; }

        [JsonProperty("chapters")]
        public Chapter[] Chapters { get; set; }

        [JsonProperty("comments")]
        public Comment[] Comments { get; set; }

        [JsonProperty("gifts")]
        public Gift[] Gifts { get; set; }

        [JsonProperty("rates")]
        public Rate[] Rates { get; set; }

        [JsonProperty("votes")]
        public Vote[] Votes { get; set; }

        [JsonProperty("ratedAs")]
        public DeletedStatus[] RatedAs { get; set; }

        [JsonProperty("tags")]
        public DeletedStatus[] Tags { get; set; }

        [JsonProperty("existingStories")]
        public ExistingStory[] ExistingStories { get; set; }
    }

    public partial class Account
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("profilePic")]
        public string ProfilePic { get; set; }

        [JsonProperty("selfDesc")]
        public string SelfDesc { get; set; }

        [JsonProperty("deletedStatus")]
        public DeletedStatus DeletedStatus { get; set; }

        [JsonProperty("prefLanguage")]
        public Language PrefLanguage { get; set; }

        [JsonProperty("authorities")]
        public DeletedStatus[] Authorities { get; set; }
    }

    public partial class DeletedStatus
    {
        [JsonProperty("body")]
        public string Body { get; set; }
    }

    public partial class Language
    {
        [JsonProperty("lanCode")]
        public string LanCode { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }
    }

    public partial class Chapter
    {
        [JsonProperty("id")]
        public long Id { get; set; }
    }

    public partial class Comment
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("replies")]
        public Chapter[] Replies { get; set; }
    }

    public partial class ExistingStory
    {
        [JsonProperty("body")]
        public string Body { get; set; }

        [JsonProperty("storyType")]
        public DeletedStatus StoryType { get; set; }
    }

    public partial class Gift
    {
        [JsonProperty("sentDate")]
        public DateTimeOffset SentDate { get; set; }

        [JsonProperty("item")]
        public DeletedStatus Item { get; set; }
    }

    public partial class Rate
    {
        [JsonProperty("rate1")]
        public long Rate1 { get; set; }
    }

    public partial class Vote
    {
        [JsonProperty("vote1")]
        public bool Vote1 { get; set; }
    }

    public partial class PostRead1
    {
        public static PostRead1[] FromJson(string json) => JsonConvert.DeserializeObject<PostRead1[]>(json, QuickType.Converter.Settings);
    }

    public static class Serialize
    {
        public static string ToJson(this PostRead1[] self) => JsonConvert.SerializeObject(self, QuickType.Converter.Settings);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
*/