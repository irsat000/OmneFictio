using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class Account
    {
        public Account()
        {
            ChatMessageAccounts = new HashSet<ChatMessage>();
            ChatMessageTargetAccounts = new HashSet<ChatMessage>();
            Comments = new HashSet<Comment>();
            PostGifts = new HashSet<PostGift>();
            Posts = new HashSet<Post>();
            Rates = new HashSet<Rate>();
            Replies = new HashSet<Reply>();
            Votes = new HashSet<Vote>();
            Authorities = new HashSet<Authority>();
            InventoryItems = new HashSet<InventoryItem>();
            Ips = new HashSet<Ip>();
        }

        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string? Pw { get; set; }
        public string Email { get; set; } = null!;
        public bool? EmailValid { get; set; }
        public string? ProfilePic { get; set; }
        public string? SelfDesc { get; set; }
        public int? Gold { get; set; }
        public bool? AllowSexual { get; set; }
        public bool? AllowViolence { get; set; }
        public byte? DeletedStatusId { get; set; }
        public int? PrefLanguageId { get; set; }
        public string? DisplayName { get; set; }

        public virtual DeletedStatus? DeletedStatus { get; set; }
        public virtual Language? PrefLanguage { get; set; }
        public virtual ICollection<ChatMessage> ChatMessageAccounts { get; set; }
        public virtual ICollection<ChatMessage> ChatMessageTargetAccounts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<PostGift> PostGifts { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<Authority> Authorities { get; set; }
        public virtual ICollection<InventoryItem> InventoryItems { get; set; }
        public virtual ICollection<Ip> Ips { get; set; }
    }
}
