using _21s5_df_32_proj.Domain.EstadosHumor;
using _21s5_df_32_proj.Infrastructure.Shared;

namespace _21s5_df_32_proj.Infrastructure.EstadosHumor
{
    public class EstadoHumorRepository : BaseRepository<EstadoHumor, EstadoHumorID>, IEstadoHumorRepository
    {
    
        public EstadoHumorRepository(_21s5_df_32_projDbContext context):base(context.EstadoHumor)
        {
           
        }


    }
}