
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OmneFictio.WebApi.Dtos;
using OmneFictio.WebApi.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace OmneFictio.WebApi.Infrastructure;
public interface IHelperServices
{
    //repetitive
    Task<List<PostDtoRead_1>> GetPosts_Details(List<PostDtoRead_1> postList, int? userId);
    Task<List<CommentDtoRead_2>> GetComments_Details(List<CommentDtoRead_2> comments, int? userId);
    //helper
    string? CreateUserToken(Account user, byte[] securityToken);
    string GeneratePassword(int length, int numberOfNonAlphanumericCharacters);
}
public class HelperServices : IHelperServices
{
    private readonly OmneFictioContext _db;
    public HelperServices(OmneFictioContext db)
    {
        _db = db;
    }

    //------ REPETITIVE ---------
    public async Task<List<PostDtoRead_1>> GetPosts_Details(List<PostDtoRead_1> postList, int? userId)
    {
        foreach (PostDtoRead_1 post in postList)
        {
            //remove non-published chapters
            //Maybe I can do this from the root later
            if (post.Chapters != null && post.Chapters.Count() > 0)
                post.Chapters = post.Chapters.Where(c => c.isPublished == true).ToList();

            //Get comment and reply count
            var commentIds = _db.Comments
                .Where(x => x.targetPostId == post.id &&
                        x.deletedStatus!.body == "Default")
                .Select(x => x.id);
            var replyCount = _db.Replies
                .Count(x => commentIds.Contains(x.commentId) &&
                        x.deletedStatus!.body == "Default");
            post.comRepLength = commentIds.Count() + replyCount;

            //Get the sum of words in chapters of the post
            char[] wordSeparator = new char[] { ' ', '\r', '\n' };
            var chbodyList = _db.Chapters
                .Where(x => x.postId == post.id &&
                        x.deletedStatus!.body == "Default" &&
                        x.isPublished == true)
                .Select(x => x.body);
            foreach (string chbody in chbodyList)
            {
                post.wordsLength += chbody.Split(wordSeparator, StringSplitOptions.RemoveEmptyEntries).Length;
            }

            //check vote by user
            if (userId != null)
            {
                Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                    v.accountId == userId &&
                    v.targetPostId == post.id);
                if (checkVoteByUser != null)
                    post.votedByUser = checkVoteByUser.body;
            }
        }
        return postList;
    }

    public async Task<List<CommentDtoRead_2>> GetComments_Details(List<CommentDtoRead_2> comments, int? userId){
        foreach (var x in comments)
        {
            Vote? checkVoteByUser = await _db.Votes.SingleOrDefaultAsync(v =>
                v.accountId == userId &&
                v.targetCommentId == x.id);
            if (checkVoteByUser != null)
                x.votedByUser = checkVoteByUser.body;
        }
        return comments;
    }

    //------ HELPER functions -------------
    public string? CreateUserToken(Account user, byte[] securityToken){
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(new List<Claim>(){
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.Actor, user.profilePic ?? "noimage")
            }),
            Issuer = "OmneFictio.com",
            Expires = DateTime.UtcNow.AddDays(30),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityToken), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        return token;
    }

    public string GeneratePassword(int length, int numberOfNonAlphanumericCharacters)
    {
        char[] Punctuations = "!@#$%^&*()_-+=[{]};:>|./?".ToCharArray();
        if (length < 1 || length > 128)
        {
            throw new ArgumentException(nameof(length));
        }

        if (numberOfNonAlphanumericCharacters > length || numberOfNonAlphanumericCharacters < 0)
        {
            throw new ArgumentException(nameof(numberOfNonAlphanumericCharacters));
        }

        using (var rng = RandomNumberGenerator.Create())
        {
            var byteBuffer = new byte[length];

            rng.GetBytes(byteBuffer);

            var count = 0;
            var characterBuffer = new char[length];

            for (var iter = 0; iter < length; iter++)
            {
                var i = byteBuffer[iter] % 87;

                if (i < 10)
                {
                    characterBuffer[iter] = (char)('0' + i);
                }
                else if (i < 36)
                {
                    characterBuffer[iter] = (char)('A' + i - 10);
                }
                else if (i < 62)
                {
                    characterBuffer[iter] = (char)('a' + i - 36);
                }
                else
                {
                    characterBuffer[iter] = Punctuations[i - 62];
                    count++;
                }
            }

            if (count >= numberOfNonAlphanumericCharacters)
            {
                return new string(characterBuffer);
            }

            int j;
            var rand = new Random();

            for (j = 0; j < numberOfNonAlphanumericCharacters - count; j++)
            {
                int k;
                do
                {
                    k = rand.Next(0, length);
                }
                while (!char.IsLetterOrDigit(characterBuffer[k]));

                characterBuffer[k] = Punctuations[rand.Next(0, Punctuations.Length)];
            }

            return new string(characterBuffer);
        }
    }
}

