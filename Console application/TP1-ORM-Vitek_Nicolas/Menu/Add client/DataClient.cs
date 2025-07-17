using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Exceptions;
using TP1_ORM_Vitek_Nicolas.Exceptions;
using TP1_ORM_Vitek_Nicolas.Menu.Add_client;

namespace _TP1_ORM_Vitek_Nicolas_.Menu
{
    public class DataClient
    {
        private Cliente _client;
        private DniValidation _validation;
        public void AskDataClient()
        {
            _validation = new DniValidation();
            while (true)
            {
                try
                {
                    Console.Clear();
                    Console.WriteLine("Ingrese el dni: ");
                    int dni = int.Parse(Console.ReadLine());
                    if (!_validation.DuplicateDni(dni))
                    {
                        if (dni < 99999999 ^ dni > 1000000)
                        {
                            throw new WrongDni();
                        }
                        Console.WriteLine("Ingrese un nombre: ");
                        string nombre = Console.ReadLine();
                        Console.WriteLine("Ingrese un apellido: ");
                        string apellido = Console.ReadLine();
                        Console.WriteLine("Ingrese direccion: ");
                        string direccion = Console.ReadLine();
                        Console.WriteLine("Ingrese telefono: ");
                        string telefono = Console.ReadLine();
                        _client = new Cliente(dni, nombre, apellido, direccion, telefono);
                        break;
                    }
                    else
                    {
                        throw new DuplicateDni();
                    }                   
                }
                catch(DuplicateDni e)
                {
                    Console.WriteLine(e.message);
                    Console.ReadKey(true);
                }
                catch (WrongDni e)
                {
                    Console.WriteLine(e.message);
                    Console.ReadKey(true);
                }
                catch (FormatException)
                {
                    Console.WriteLine("Debe ingresar un valor. Presione una tecla para volver atras ");
                    Console.ReadKey(true);
                }
                catch (OverflowException)
                {
                    Console.WriteLine("Debe ingresar un dni valido. Presione una tecla para volver atras");
                    Console.ReadKey(true);
                }
            }
        }
        public Cliente GetClient()
        {
            return _client;
        }
    }
}