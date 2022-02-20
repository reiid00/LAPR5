using System.Collections.Generic;
using System.Threading.Tasks;

namespace _21s5_df_32_proj.Domain.Shared
{
    public interface IRepository<TEntity, TEntityId>
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(TEntityId id);
        Task<List<TEntity>> GetByIdsAsync(List<TEntityId> ids);
        Task<TEntity> AddAsync(TEntity obj);
        void Remove(TEntity obj);
    }
}