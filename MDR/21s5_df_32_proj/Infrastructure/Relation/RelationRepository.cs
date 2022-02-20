using _21s5_df_32_proj.Domain.Relations;
using _21s5_df_32_proj.Infrastructure.Shared;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Infrastructure.Relations
{
    public class RelationRepository : BaseRepository<Relation, RelationID>, IRelationRepository
    {
    private readonly DbSet<Relation> _objs;
        public RelationRepository(_21s5_df_32_projDbContext context):base(context.Relation)
        {
             this._objs = context.Relation ?? throw new ArgumentNullException(nameof(context.Relation));
           
        }
        
        public async Task<List<Relation>> GetFromUserIdAsync(UtilizadorID id)
        {
            //Console.Write("REP "+ id);
            return await this._objs
                .Where(x => id.Equals(x.UserID1)).ToListAsync();
        }

        public async Task<Relation> GetRelationFromUsersIDsAsync(UtilizadorID id1, UtilizadorID id2){
            return await this._objs
                .Where(x => id1.Equals(x.UserID1) && id2.Equals(x.UserID2)).FirstOrDefaultAsync();
        }

    }
}