using _21s5_df_32_proj.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Relations
{
    public interface IRelationRepository: IRepository<Relation,RelationID>
    {

        Task<List<Relation>> GetFromUserIdAsync(UtilizadorID id);
        Task<Relation> GetRelationFromUsersIDsAsync(UtilizadorID id1, UtilizadorID id2);
    }

    
}