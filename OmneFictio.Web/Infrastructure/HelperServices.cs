

using System.Text.Json;

namespace OmneFictio.Web.Infrastructure;

public interface IHelperServices
{
    //helper
    int? checkUserLogin();
    Task<Dictionary<string, string>> getDictFromResponse(HttpResponseMessage response);
}
public class HelperServices : IHelperServices
{
    private readonly HttpClient _httpClient;
    private readonly HttpContext _httpContext;

    public HelperServices(IHttpClientFactory httpClientFactory, IHttpContextAccessor httpContext)
    {
        _httpClient = httpClientFactory.CreateClient("of");
        _httpContext = httpContext.HttpContext!;
    }

    public int? checkUserLogin(){
        try
        {
            if(_httpContext == null)
                return null;
            int? accountid = Convert.ToInt32(_httpContext.User.FindFirst("nameid")!.Value);
            return accountid;
        }
        catch (Exception) { return null; } 
    }
    public async Task<Dictionary<string, string>> getDictFromResponse(HttpResponseMessage response)
    {
        string raw = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Dictionary<string, string>>(raw);
        return result!;
    }

}