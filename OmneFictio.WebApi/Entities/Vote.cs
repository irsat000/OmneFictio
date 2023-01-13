using System;
using System.Collections.Generic;

namespace OmneFictio.WebApi.Entities;

public partial class Vote
{
    public int id { get; set; }

    public int accountId { get; set; }

    public bool body { get; set; }

    public int? targetPostId { get; set; }

    public int? targetChapterId { get; set; }

    public int? targetCommentId { get; set; }

    public int? targetReplyId { get; set; }

    public virtual Account account { get; set; } = null!;

    public virtual Chapter? targetChapter { get; set; }

    public virtual Comment? targetComment { get; set; }

    public virtual Post? targetPost { get; set; }

    public virtual Reply? targetReply { get; set; }
}
