namespace _TP1_ORM_Vitek_Nicolas_.Entities
{
    public class Cliente
    {
        public int ClienteId { get; set; }
        public int DNI { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public ICollection<Carrito> Carrito { get; set; }
        public Cliente() { }
        public Cliente(int dNI, string nombre, string apellido, string direccion, string telefono)
        {
            DNI = dNI;
            Nombre = nombre;
            Apellido = apellido;
            Direccion = direccion;
            Telefono = telefono;
        }
    }
}