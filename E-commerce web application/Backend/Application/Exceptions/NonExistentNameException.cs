namespace Application.Exceptions
{
        public class NonExistentNameException : Exception
        {
                public NonExistentNameException() : base("El registro con ese nombre no existe") { }
        }
}