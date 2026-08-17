namespace Application.Response
{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public ClientResponse Client { get; set; } = new();
    }
}