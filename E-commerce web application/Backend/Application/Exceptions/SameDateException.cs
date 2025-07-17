namespace Application.Exceptions
{
    public class SameDateException: Exception
    {
        public string message = "Las fechas no pueden ser iguales";
    }
}