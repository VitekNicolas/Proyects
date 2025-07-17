using Domain.Entities;

namespace Application.Interface
{
    public interface ICartCommand
    {
        public Task InsertCart(Cart cart);

    }
}
