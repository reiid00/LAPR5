using _21s5_df_32_proj.Domain.Pedidos;
using _21s5_df_32_proj.Infrastructure.Shared;

namespace _21s5_df_32_proj.Infrastructure.Pedidos
{
    public class PedidoRepository : BaseRepository<Pedido, PedidoID>, IPedidoRepository
    {
    
        public PedidoRepository(_21s5_df_32_projDbContext context):base(context.Pedido)
        {
           
        }


    }
}