using Application.Response;
using Application.UserCase;

namespace Application.Interface
{
    public interface IOrderQuery
    {
        public void UpdateStatusCart(int clientId);
        public OrderProductData CalculateTotal(int clientId);
        public Task<List<DataBalanceResponse>> GetBalance(DateTime from, DateTime to);
    }
}
