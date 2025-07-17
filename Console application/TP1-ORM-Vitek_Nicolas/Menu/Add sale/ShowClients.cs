using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace TP1_ORM_Vitek_Nicolas.Menu.Add_sale
{
    public class ShowClients
    {
        public void Display()
        {
            Console.WriteLine("Lista de clientes");
            using (var context = new AppDbContext())
            {
                var clients = context.Cliente.ToList();
                foreach (var client in clients)
                {
                    Console.WriteLine("{0} {1} {2}",client.ClienteId, client.Nombre, client.Apellido);
                }
            }
        }
    }
}
