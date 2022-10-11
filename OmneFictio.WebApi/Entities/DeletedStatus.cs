using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities
{
    public partial class DeletedStatus
    {
        public DeletedStatus()
        {
            Accounts = new HashSet<Account>();
            Comments = new HashSet<Comment>();
            Posts = new HashSet<Post>();
            Replies = new HashSet<Reply>();
            Requests = new HashSet<Request>();
        }

        public byte id { get; set; }
        public string body { get; set; } = null!;

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
        public virtual ICollection<Request> Requests { get; set; }
    }
}
