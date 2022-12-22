namespace OmneFictio.WebApi.Dtos;

public class ChatMessageDto
{
        public int id { get; set; }
        public int targetAccountId { get; set; }
        public string body { get; set; } = null!;
        public DateTime sentDate { get; set; }
}