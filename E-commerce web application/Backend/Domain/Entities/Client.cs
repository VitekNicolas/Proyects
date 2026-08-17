using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Client
    {
        [Column("clientId")]
        public int ClientId { get; set; }
        [Column("dni")]
        public int DNI { get; set; }
        [Column("firstName")]
        public string? FirstName { get; set; }
        [Column("lastName")]
        public string? LastName { get; set; }
        [Column("address")]
        public string? Address { get; set; }
        [Column("phoneNumber")]
        public string? PhoneNumber { get; set; }
        [Column("email")]
        public string? Email { get; set; }
        [Column("passwordHash")]
        public string? PasswordHash { get; set; }
        public ICollection<Cart>? Cart { get; set; }
        public Client(int dni, string firstName, string lastName, string address, string phoneNumber, string email, string passwordHash)
        {
            DNI = dni;
            FirstName = firstName;
            LastName = lastName;
            Address = address;
            PhoneNumber = phoneNumber;
            Email = email;
            PasswordHash = passwordHash;
        }
        public Client(){}
    }
}