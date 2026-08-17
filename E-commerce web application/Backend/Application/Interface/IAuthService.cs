using Application.Interface.Models;
using Application.Response;

namespace Application.Interface
{
    public interface IAuthService
    {
        Task<ClientResponse> Register(RegisterRequest request);
        Task<ClientResponse> Login(LoginRequest request);
    }
}