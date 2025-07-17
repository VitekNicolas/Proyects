using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace TP1_ORM_Vitek_Nicolas.Command
{
    public class ChangeStatusCommand
    {
        public void SetStatus(int clienteId, bool status)
        {
            using (var context = new AppDbContext())
            {
                var carrito = context.Carrito.Where(c => c.ClienteId == clienteId).ToList(); 
                carrito.ForEach(a => a.Estado = status);
                context.SaveChanges();
            }
        }
    }
}
