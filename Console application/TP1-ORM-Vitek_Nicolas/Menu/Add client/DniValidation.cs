using _TP1_ORM_Vitek_Nicolas_.Entities;
using _TP1_ORM_Vitek_Nicolas_.Persistence;

namespace TP1_ORM_Vitek_Nicolas.Menu.Add_client
{
    public class DniValidation
    {
        public bool DuplicateDni(int dni)
        {
            List<Cliente> list;
            using (var context= new AppDbContext())
            {
                var query = from cl in context.Cliente
                            where cl.DNI == dni
                            select cl;
                list= query.ToList();
            }
            if (list.Count==0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
