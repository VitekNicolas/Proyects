using Application.Exceptions;
using Application.Interface;
using Application.Interface.Models;
using Application.Response;
using BCryptNet = BCrypt.Net.BCrypt;
using Domain.Entities;

namespace Application.UserCase.Auth
{
    public class AuthService(IClientCommand command, IClientQuery query) : IAuthService
    {
        private readonly IClientCommand _command = command;
        private readonly IClientQuery _query = query;

        public async Task<ClientResponse> Register(RegisterRequest request)
        {
            if (_query.DuplicateDni(request.DNI))
            {
                throw new DuplicateDniException();
            }
            if (InvalidDni(request.DNI))
            {
                throw new InvalidDniException();
            }
            if (_query.DuplicateEmail(request.Email))
            {
                throw new DuplicateEmailException();
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var client = new Client(
                request.DNI,
                request.FirstName ?? string.Empty,
                request.LastName ?? string.Empty,
                request.Address ?? string.Empty,
                request.PhoneNumber ?? string.Empty,
                request.Email,
                passwordHash
            );

            await _command.InsertClient(client);

            return new ClientResponse
            {
                ClientId = client.ClientId,
                DNI = client.DNI,
                FirstName = client.FirstName,
                LastName = client.LastName,
                Address = client.Address,
                PhoneNumber = client.PhoneNumber
            };
        }

        public async Task<ClientResponse> Login(LoginRequest request)
        {
            var client = _query.GetClientByEmail(request.Email);
            if (client == null || client.PasswordHash == null)
            {
                throw new InvalidCredentialsException();
            }
            bool validPassword = BCrypt.Net.BCrypt.Verify(request.Password, client.PasswordHash);
            if (!validPassword)
            {
                throw new InvalidCredentialsException();
            }

            return new ClientResponse
            {
                ClientId = client.ClientId,
                DNI = client.DNI,
                FirstName = client.FirstName,
                LastName = client.LastName,
                Address = client.Address,
                PhoneNumber = client.PhoneNumber
            };
        }

        private bool InvalidDni(int dni)
        {
            return !(dni >= 1000000 && dni <= 99999999);
        }
    }
}