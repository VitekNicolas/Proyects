using Application.Response;
using Domain.Entities;

namespace Application.Interface
{
    public interface IOrderService
    {
        public Task<Order> CreateOrder(int clientId);
        public Task<IEnumerable<DataBalanceResponse>> ShowBalance(DateTime from, DateTime to);
        public Task<IEnumerable<DataBalanceResponse>> GetMyOrders(int clientId);
    }
}