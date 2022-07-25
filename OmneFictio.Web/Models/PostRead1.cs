// Generated by https://quicktype.io

namespace QuickType
{
    using System;
    using System.Collections.Generic;

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
