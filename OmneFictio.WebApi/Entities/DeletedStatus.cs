using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class DeletedStatus
{
    public byte id { get; set; }

    public string body { get; set; } = null!;

    public virtual ICollection<Account> Accounts { get; } = new List<Account>();

    public virtual ICollection<Chapter> Chapters { get; } = new List<Chapter>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<Post> Posts { get; } = new List<Post>();

    public virtual ICollection<Reply> Replies { get; } = new List<Reply>();

    public virtual ICollection<Request> Requests { get; } = new List<Request>();
}
