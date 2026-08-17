namespace Application.Response
{
    public class ClientResponse
    {
        public int ClientId { get; set; }
        public int DNI { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }
}