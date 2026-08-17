namespace Application.Exceptions
{
    public class DuplicateEmailException : Exception
    {
        public DuplicateEmailException() : base("Ya existe un cliente registrado con ese email") { }
    }
}