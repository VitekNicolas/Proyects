using System.Data.SqlTypes;
using Application.Interface;
using Application.Response;
using Application.UserCase;
using Infraesctructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infraesctructure.Query
{
    public class OrderQuery : IOrderQuery
    {
        private readonly AppDbContext _context;
        public OrderQuery(AppDbContext context)
        {
            _context = context;
        }
        public void UpdateStatusCart(int clientId)
        {
var query = from cl in _context.Client
            where cl.ClientId == clientId
            join c in _context.Cart on cl.ClientId equals c.ClientId
            select c;

foreach (var cart in query)
{
    cart.Status = false;
}
            _context.SaveChanges();
        }
        public OrderProductData CalculateTotal(int clientId)
        {
            int cartId=0;
            double total = 0;
            var productsInCart = from cl in _context.Client
                        where cl.ClientId == clientId
                        join c in _context.Cart on cl.ClientId equals c.ClientId
                        where c.Status == false
                        join cp in _context.ProductCart on c.CartId equals cp.CartId
                        join p in _context.Product on cp.ProductId equals p.ProductId
                        select new OrderProductData
                        {
                            Price = p.Price,
                            Amount = cp.Amount,
                            CartId = c.CartId
                        };
            var listOfProducts = productsInCart.ToList();
            foreach (OrderProductData product in listOfProducts)
            {
                total += product.Price * product.Amount;
                cartId = product.CartId;
            }
            OrderProductData result = new()
            {
                Total = total,
                CartId = cartId
            };
            return result;
        }
        public async Task<List<DataBalanceResponse>> GetBalance(DateTime desde, DateTime hasta)
        {
            var query = from p in _context.Product
                        join cp in _context.ProductCart on p.ProductId equals cp.ProductId
                        join c in _context.Cart on cp.CartId equals c.CartId
                        join o in _context.Order on c.CartId equals o.CartId
                        join cl in _context.Client on c.ClientId equals cl.ClientId
                        where o.Date > desde & o.Date < hasta
                        select new DataBalanceResponse
                        {
                            FirstNameClient = cl.FirstName,
                            LastNameClient = cl.LastName,
                            ProductName = p.Name,
                            ProductAmount = cp.Amount,
                            SubTotal = cp.Amount * p.Price,
                            Total = o.Total,
                            ProductPrice = p.Price
                        };
            return await query.ToListAsync();
        }
    }
}