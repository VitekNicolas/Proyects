
namespace Application.Interface
{
    public interface IChangeStatusCommand
    {
        public void SetStatus(int clienteId, bool status);
    }
}
