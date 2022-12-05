
using Microsoft.EntityFrameworkCore;
using OmneFictio.WebApi.Dtos;
using OmneFictio.WebApi.Entities;

namespace OmneFictio.WebApi.Infrastructure;
public interface IFetchServices
{
    Task<List<PostDtoRead_1>> GetPosts_Details(List<PostDtoRead_1> postList, int? userId);
}
public class FetchServices : IFetchServices
{
    private readonly OmneFictioContext _db;
    public FetchServices(OmneFictioContext db)
    {
        _db = db;
    }
    public async Task<List<PostDtoRead_1>> GetPosts_Details(List<PostDtoRead_1> postList, int? userId)
    {
        foreach (PostDtoRead_1 post in postList)
        {
            //remove if the chapters are not published
            //Maybe I can fix this from the root later
            if (post.chapters != null && post.chapters.Count() > 0)
                post.chapters = post.chapters.Where(c => c.IsPublished == true).ToList();

            //Get comment and reply count
            var commentIds = _db.Comments
                .Where(x => x.targetPostId == post.id &&
                        x.deletedStatus!.body == "Default")
                .Select(x => x.id);
            var replyCount = _db.Replies
                .Count(x => commentIds.Contains(x.commentId ?? -1) &&
                        x.deletedStatus!.body == "Default");
            post.comRepLength = commentIds.Count() + replyCount;

            //Get the sum of words in chapters of the post
            char[] wordSeparator = new char[] { ' ', '\r', '\n' };
            var chbodyList = _db.Chapters
                .Where(x => x.postId == post.id &&
                        x.deletedStatus!.body == "Default" &&
                        x.isPublished == true)
                .Select(x => x.body);
            foreach (string? chbody in chbodyList)
            {
                post.wordsLength += chbody != null
                    ? chbody.Split(wordSeparator, StringSplitOptions.RemoveEmptyEntries).Length : 0;
            }

            //check vote by user
            if (userId != null)
            {
                Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                    v.accountId == userId &&
                    v.targetPostId == post.id);
                if (checkVoteByUser != null)
                    post.VotedByUser = checkVoteByUser.body;
            }
        }
        return postList;
    }
}

