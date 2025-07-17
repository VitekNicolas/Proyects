using Application.Models;
using Application.Response;
using Domain.Entities;

namespace Application.Interface
{
    public interface IClientService
    {
        Task<Client> CreateClient(ClientRequest request);
        Task<ClientResponse> GetAll(int id);
        public bool DuplicateDni(int dni);

        public bool InvalidDni(int dni);
    }
}
