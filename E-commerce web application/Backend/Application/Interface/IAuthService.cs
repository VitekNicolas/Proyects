using Application.Interface.Models;
using Application.Response;

namespace Application.Interface
{
    public interface IAuthService
    {
        Task<AuthResponse> Register(RegisterRequest request);
        Task<AuthResponse> Login(LoginRequest request);
    }
}