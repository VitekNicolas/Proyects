using Domain.Entities;

namespace Application.Interface
{
    public interface ITokenService
    {
        string GenerateToken(Client client);
    }
}