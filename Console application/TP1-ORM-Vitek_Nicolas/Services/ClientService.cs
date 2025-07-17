using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Interface;
using _TP1_ORM_Vitek_Nicolas_.Menu;

namespace _TP1_ORM_Vitek_Nicolas_.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientCommand _command;
        private DataClient _dataClient;
        private Cliente _client;

        public ClientService(IClientCommand command)
        {
            _command = command;
        }
        public void CreateClient()
        {
            bool status = true;
            while (status)
            {
                _dataClient = new DataClient();
                _dataClient.AskDataClient();
                _client = _dataClient.GetClient();
                _command.InsertClient(_client);
                Console.WriteLine("Pulse 1 para volver al menu principal o 2 para cargar otro cliente");
                string option = Console.ReadLine();
                if (option == "1")
                {
                    status = false;
                }
                if (option == "2")
                {
                    continue;
                }
            }
        }
    }
}