namespace Application.Exceptions
{
    public class InvalidDniException : Exception
    {
        public InvalidDniException() : base("El dni ingresado no es valido. Debe ser mayor a 1000000 y menor a 99999999") { }
    }
}