using Application.Exceptions;
using Application.Interface;
using Application.Response;
using Domain.Entities;

namespace Application.UserCase
{
    public class OrderService : IOrderService
    {
        private readonly IOrderCommand _command;
        private readonly IOrderQuery _query;
        public OrderService(IOrderCommand command, IOrderQuery query)
        {
            _command = command;
            _query = query;
        }
        public async Task<Order> CreateOrder(int clientId)
        {
            _query.UpdateStatusCart(clientId);
            OrderProductData result = _query.CalculateTotal(clientId);
            var order = new Order
            {
                CartId = result.CartId,
                Date = DateTime.Now,
                Total = result.Total
            };
            await _command.InsertOrder(order);
            return order;
        }
        public async Task<IEnumerable<DataBalanceResponse>> ShowBalance(DateTime from, DateTime to)
        {
            if (from == to)
            {
                throw new SameDateException();
            }
            var result = await _query.GetBalance(from, to);
            //return result.Select(db=>db);
            return result;
        }
    }
}