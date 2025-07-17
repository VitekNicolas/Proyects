public class InvalidDniException: Exception
{
    public string message = "El dni ingresado no es valido. Debe ser mayor a 1000000 y menor a 99999999";
}