namespace Application.Models
{
    /// <summary>Datos necesarios para crear un cliente nuevo.</summary>
    public class ClientRequest
    {
        /// <summary>DNI del cliente, sin puntos. Debe estar entre 1000000 y 99999999.</summary>
        public int DNI { get; set; }
        /// <summary>Nombre del cliente.</summary>
        public string? FirstName { get; set; }
        /// <summary>Apellido del cliente.</summary>
        public string? LastName { get; set; }
        /// <summary>Dirección del cliente.</summary>
        public string? Address { get; set; }
        /// <summary>Número de teléfono del cliente.</summary>
        public string? PhoneNumber { get; set; }
    }
}