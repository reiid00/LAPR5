using _21s5_df_32_proj.Infrastructure.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace _21s5_df_32_proj.Infrastructure.Utilizadores
{
    public class UtilizadorRepository : BaseRepository<Utilizador, UtilizadorID>, IUtilizadorRepository
    {
    
        public UtilizadorRepository(_21s5_df_32_projDbContext context):base(context.Utilizador)
        {
           context.Utilizador.Include(TagUtilizador=>TagUtilizador.TagUtilizadores).ThenInclude(TagUtilizador=>TagUtilizador.Tag.TagUtilizadores).ToList();
        }


    }
}