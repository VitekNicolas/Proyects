namespace Application.Interface.Models
{
    /// <summary>Credenciales para iniciar sesión.</summary>
    public class LoginRequest
    {
        /// <summary>Email registrado del cliente.</summary>
        public string Email { get; set; } = string.Empty;
        /// <summary>Contraseña en texto plano.</summary>
        public string Password { get; set; } = string.Empty;
    }
}