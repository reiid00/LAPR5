using System.Threading.Tasks;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly _21s5_df_32_projDbContext _context;

        public UnitOfWork(_21s5_df_32_projDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}