using Application.Response;

namespace Application.Interface
{
    public interface ICartService
    {
        Task<CartResponse> GetMyCart(int clientId);
    }
}