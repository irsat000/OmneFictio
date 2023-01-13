using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Account
{
    public int id { get; set; }

    public string? externalId { get; set; }

    public string externalType { get; set; } = null!;

    public string username { get; set; } = null!;

    public string pw { get; set; } = null!;

    public string email { get; set; } = null!;

    public bool emailValid { get; set; }

    public string? displayName { get; set; }

    public string? profilePic { get; set; }

    public string? selfDesc { get; set; }

    public int gold { get; set; }

    public byte? deletedStatusId { get; set; }

    public virtual ICollection<AccountIP> AccountIPs { get; } = new List<AccountIP>();

    public virtual ICollection<AccountThemeSelections_MM> AccountThemeSelections_MMs { get; } = new List<AccountThemeSelections_MM>();

    public virtual ICollection<ChatMessage> ChatMessageaccounts { get; } = new List<ChatMessage>();

    public virtual ICollection<ChatMessage> ChatMessagetargetAccounts { get; } = new List<ChatMessage>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<FollowedUser> FollowedUseraccounts { get; } = new List<FollowedUser>();

    public virtual ICollection<FollowedUser> FollowedUsertargetAccounts { get; } = new List<FollowedUser>();

    public virtual ICollection<PostGift> PostGifts { get; } = new List<PostGift>();

    public virtual ICollection<Post> Posts { get; } = new List<Post>();

    public virtual ICollection<Preference> Preferences { get; } = new List<Preference>();

    public virtual ICollection<Rate> Rates { get; } = new List<Rate>();

    public virtual ICollection<Reply> Replies { get; } = new List<Reply>();

    public virtual ICollection<Request> Requests { get; } = new List<Request>();

    public virtual ICollection<SavedPost> SavedPosts { get; } = new List<SavedPost>();

    public virtual ICollection<Vote> Votes { get; } = new List<Vote>();

    public virtual DeletedStatus? deletedStatus { get; set; }

    public virtual ICollection<Authority> authorities { get; } = new List<Authority>();

    public virtual ICollection<InventoryItem> inventoryItems { get; } = new List<InventoryItem>();
}
