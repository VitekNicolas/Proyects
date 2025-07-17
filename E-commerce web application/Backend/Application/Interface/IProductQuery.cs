using Domain.Entities;

namespace Application.Interface
{
    public interface IProductQuery
    {
        public Product? GetProduct(int id);
        public Task<List<Product>> GetAll(string name, bool sort);
    }
}
