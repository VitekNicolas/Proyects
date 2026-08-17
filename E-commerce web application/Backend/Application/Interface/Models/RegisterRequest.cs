namespace Application.Interface.Models
{
    /// <summary>Datos necesarios para registrar un cliente nuevo con credenciales de acceso.</summary>
    public class RegisterRequest
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
        /// <summary>Email del cliente, usado para iniciar sesión. Debe ser único.</summary>
        public string Email { get; set; } = string.Empty;
        /// <summary>Contraseña en texto plano (se hashea antes de guardar).</summary>
        public string Password { get; set; } = string.Empty;
    }
}