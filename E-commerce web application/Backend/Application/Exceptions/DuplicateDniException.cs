namespace Application.Exceptions
{
    public class DuplicateDniException:Exception
    {
        public string message = "Ya existe un cliente con ese dni";
    }
}
