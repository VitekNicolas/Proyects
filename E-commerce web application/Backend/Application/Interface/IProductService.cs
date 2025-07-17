
using Application.Response;

namespace Application.Interface
{
    public interface IProductService
    {
        Task<ProductResponse> GetProduct(int id);
        Task<IEnumerable<ProductResponse>> GetAll(string name, bool sort);
    }
}
