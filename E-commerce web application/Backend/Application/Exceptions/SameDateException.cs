namespace Application.Exceptions
{
    public class SameDateException: Exception
    {
        public SameDateException() : base("Las fechas no pueden ser iguales") { }
    }
}