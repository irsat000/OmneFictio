using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class Account
    {
        public Account()
        {
            ChatMessageaccounts = new HashSet<ChatMessage>();
            ChatMessagetargetAccounts = new HashSet<ChatMessage>();
            Comments = new HashSet<Comment>();
            PostGifts = new HashSet<PostGift>();
            Posts = new HashSet<Post>();
            Rates = new HashSet<Rate>();
            Replies = new HashSet<Reply>();
            Requests = new HashSet<Request>();
            Votes = new HashSet<Vote>();
            authorities = new HashSet<Authority>();
            inventoryItems = new HashSet<InventoryItem>();
            ips = new HashSet<IP>();
        }

        public int id { get; set; }
        public string? externalId { get; set; }
        public string? externalType { get; set; }
        public string username { get; set; } = null!;
        public string? pw { get; set; }
        public string email { get; set; } = null!;
        public bool? emailValid { get; set; }
        public string? displayName { get; set; }
        public string? profilePic { get; set; }
        public string? selfDesc { get; set; }
        public int? gold { get; set; }
        public byte? deletedStatusId { get; set; }
        public int? prefLanguageId { get; set; }
        public bool? allowAdultContent { get; set; }

        public virtual DeletedStatus? deletedStatus { get; set; }
        public virtual Language? prefLanguage { get; set; }
        public virtual ICollection<ChatMessage> ChatMessageaccounts { get; set; }
        public virtual ICollection<ChatMessage> ChatMessagetargetAccounts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<PostGift> PostGifts { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
        public virtual ICollection<Request> Requests { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<Authority> authorities { get; set; }
        public virtual ICollection<InventoryItem> inventoryItems { get; set; }
        public virtual ICollection<IP> ips { get; set; }
    }
}
