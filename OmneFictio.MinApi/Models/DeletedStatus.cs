using System;
using System.Collections.Generic;

namespace OmneFictio.MinApi.Models
{
    public partial class DeletedStatus
    {
        public DeletedStatus()
        {
            Accounts = new HashSet<Account>();
            Comments = new HashSet<Comment>();
            Posts = new HashSet<Post>();
            Replies = new HashSet<Reply>();
        }

        public byte Id { get; set; }
        public string Body { get; set; } = null!;

        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
    }
}
