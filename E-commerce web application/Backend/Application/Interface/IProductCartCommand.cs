using Domain.Entities;

namespace Application.Interface
{
    public interface IProductCartCommand
    {
        public Task InsertProductCart(ProductCart productCart);

        public Task UpdateProductCart(ProductCart productCart);
        public Task DeletedProductCart(ProductCart productCart);
    }
}
