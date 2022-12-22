
namespace OmneFictio.WebApi.Dtos;
public partial class TagDto
{
    public int id { get; set; }
    public string body { get; set; } = null!;
    public bool userGenerated { get; set; }
}
//Get tags

public partial class TagDtoWrite_1
{
    public int id { get; set; }
}
//Unnecessary right now