using _TP1_ORM_Vitek_Nicolas_.Command;
using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Exceptions;
using _TP1_ORM_Vitek_Nicolas_.Menu;
using _TP1_ORM_Vitek_Nicolas_.Persistence;
using _TP1_ORM_Vitek_Nicolas_.Services;
using System.Collections;
using TP1_ORM_Vitek_Nicolas.Command;
using TP1_ORM_Vitek_Nicolas.Menu.Add_sale;
using TP1_ORM_Vitek_Nicolas.Query;

namespace _TP1_ORM_Vitek_Nicolas_
{
    public class MainProgram
    {
        private MainMenu _mainMenu;
        public void EjectueMenu()
        {
            SalesQuery salesQuery = new SalesQuery();
            _mainMenu = new MainMenu();
            while (true)
            {
                _mainMenu.DisplayMainMenu();
                try
                {
                    Console.Write("Elija una opcion del 1 al 4: ");
                    int number = int.Parse(Console.ReadLine());
                    if (number == 1)
                    {
                        using (var context = new AppDbContext())
                        {
                            ClientCommand clientCommand = new ClientCommand(context);
                            ClientService clientService = new ClientService(clientCommand);
                            clientService.CreateClient();
                        }
                    }
                    if (number==2)
                    {
                        Console.Clear();
                        AddCar addCar = new AddCar();
                        new ShowClients().Display();
                        Console.Write("Ingrese el id del cliente: ");
                        int clientId = int.Parse(Console.ReadLine());
                        addCar.Ejecute(clientId);
                        Carrito car = addCar.GetCar();
                        new ChangeStatusCommand().SetStatus(clientId, false);
                        ProductSelect productSelect=new ProductSelect();
                        productSelect.AskProductSelect();
                        ArrayList list = productSelect.GetList();
                        new ChangeStatusCommand().SetStatus(clientId, true);
                        new AddProductCar().Ejecute(list, car);
                    }
                    if (number==3)
                    {
                        Console.Clear();
                        Console.WriteLine(salesQuery);
                        Console.Write("\nPulse una tecla para volver atras . . . ");
                        Console.ReadKey(true);

                    }
                    if (number==4)
                    {
                        Console.Clear();
                        Console.WriteLine(salesQuery);
                        Console.WriteLine("Ingrese el id del producto: ");
                        int id = int.Parse(Console.ReadLine());
                        ProductQuery productQuery = new ProductQuery();
                        Console.WriteLine(productQuery.SearchInList(id));
                        Console.Write("\nPulse una tecla para volver atras . . . ");
                        Console.ReadKey(true);
                    }
                    if (number>4)
                    {
                        throw new WrongOption();
                    }
                }
                catch (WrongOption e)
                {
                    Console.WriteLine(e.message);
                    Console.ReadKey(true);
                }
                catch (FormatException)
                {
                    Console.WriteLine("Debe ingresar una opcion del 1 al 4. Presione una tecla volver atras");
                    Console.ReadKey(true);
                }
                catch (ArgumentNullException)
                {
                    Console.ReadKey(true);
                }
                catch (OverflowException)
                {
                    Console.WriteLine("Debe ingresar una opcion del 1 al 4. Presione una tecla para volver atras");
                    Console.ReadKey(true);
                }
            }
        }
    }
}