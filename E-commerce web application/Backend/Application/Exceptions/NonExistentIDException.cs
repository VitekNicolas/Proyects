namespace Application.Exceptions
{
        public class NonExistentIDException : Exception
        {
                public NonExistentIDException() : base("El registro con ese ID no existe") { }
        }
}