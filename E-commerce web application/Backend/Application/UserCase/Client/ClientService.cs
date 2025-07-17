using Application.Exceptions;
using Application.Interface;
using Application.Models;
using Application.Response;
using Domain.Entities;

namespace Application.UserCase
{
    public class ClientService : IClientService
    {
        private readonly IClientCommand _command;
        private readonly IClientQuery _query;
        public ClientService(IClientCommand command, IClientQuery query)
        {
            _command = command;
            _query = query;
        }
        public async Task<Client> CreateClient(ClientRequest request)
        {
            if (DuplicateDni(request.DNI))
            {
                throw new DuplicateDniException();
            }
            if (InvalidDni(request.DNI))
            {
                throw new InvalidDniException();
            }
            var client = new Client
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
                DNI = request.DNI,
                PhoneNumber = request.PhoneNumber
            };
            await _command.InsertClient(client);
            return client;
        }
        public bool DuplicateDni(int dni)
        {
            return _query.DuplicateDni(dni);
        }
        public bool InvalidDni(int dni)
        {
            if (dni > 10000000 && dni < 99999999)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public Task<ClientResponse> GetAll(int id)
        {
            var client = _query.GetClient(id);
            if (client==null)
            {
                throw new NonExistentIDException();
            }
            return Task.FromResult(new ClientResponse
            {
                FirstName = client.FirstName,
                LastName = client.LastName,
                DNI = client.DNI,
                PhoneNumber = client.PhoneNumber,
                Address = client.Address
            });
        }

    }
}