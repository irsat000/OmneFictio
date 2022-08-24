using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using OmneFictio.MinApi.Dtos;
using System.Text.Json.Serialization;
using Google.Apis.Auth;
using OmneFictio.MinApi.Models;

namespace OmneFictio.MinApi.Stored;

public static class GeneratePassword
{
    private static readonly char[] Punctuations = "!@#$%^&*()_-+=[{]};:>|./?".ToCharArray();

    public static string Generate(int length, int numberOfNonAlphanumericCharacters)
    {
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

public class MyMethods{
    JwtSecurityTokenHandler _jwtHandler = new JwtSecurityTokenHandler();
    public string CreateUserToken(Account user, byte[] securityToken){
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(new List<Claim>(){
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Actor, user.ProfilePic ?? "noimage")
            }),
            Issuer = "OmneFictio.com",
            Expires = DateTime.UtcNow.AddDays(30),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityToken), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        return token;
    }
}

/*
public class CustomPayload : JsonWebSignature.Payload{
    [JsonPropertyName("sub")]
     public string Subject { get; set; }
    [JsonPropertyName("email")]
     public string Email { get; set; }
    [JsonPropertyName("name")]
     public string Name { get; set; }
    [JsonPropertyName("picture")]
     public string Picture { get; set; }
}
*/