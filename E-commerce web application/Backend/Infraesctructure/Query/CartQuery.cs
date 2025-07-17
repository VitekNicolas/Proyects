using Application.Interface;
using Infraesctructure.Persistence;

namespace Infraesctructure.Query
{
    public class CartQuery : ICartQuery
    {
        private readonly AppDbContext _context;

        public CartQuery(AppDbContext context)
        {
            _context = context;
        }

        public int GetCartId(int clientId)
        {
            int cartId= _context.Cart
                           .Where(c => c.ClientId == clientId && c.Status)
                           .Select(c => c.CartId)
                           .FirstOrDefault();
            return cartId;               
        }
    }
}
