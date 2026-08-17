using Application.Exceptions;
using Application.Interface;
using Application.Response;
using Domain.Entities;

namespace Application.UserCase
{
    public class OrderService(IOrderCommand command, IOrderQuery query) : IOrderService
    {
        private readonly IOrderCommand _command = command;
        private readonly IOrderQuery _query = query;

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
            return result;
        }

        public async Task<IEnumerable<DataBalanceResponse>> GetMyOrders(int clientId)
        {
            var result = await _query.GetClientOrders(clientId);
            return result;
        }
    }
}