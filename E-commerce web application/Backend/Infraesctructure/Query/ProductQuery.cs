using Application.Interface;
using Domain.Entities;
using Infraesctructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infraesctructure.Query
{
    public class ProductQuery : IProductQuery
    {
        private readonly AppDbContext _context;

        public ProductQuery(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetAll(string name, bool sort)
        {
            var products = from p in _context.Product
                           where p.Name == name
                           select p;
            switch (sort)
            {
                case false:
                    products = products.OrderByDescending(p => p.Price);
                    break;
                case true:
                    products = products.OrderBy(p => p.Price);
                    break;
            }
            return await products.ToListAsync();
        }

        public Product? GetProduct(int id)
        {
            var product = _context.Product
                .FirstOrDefault(p => p.ProductId == id);
            return product;
        }
    }
}