namespace Application.Exceptions
{
    public class DuplicateDniException:Exception
    {
        public DuplicateDniException() : base("Ya existe un cliente con ese dni") { }
    }
}
