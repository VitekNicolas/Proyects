using Domain.Entities;

namespace Application.Interface
{
    public interface IClientQuery
    {
        public Client? GetClient(int id);
        bool DuplicateDni(int dni);
        public bool DuplicateEmail(string email);
        public Client? GetClientByEmail(string email);
    }
}
