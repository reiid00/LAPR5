using System.Threading.Tasks;

namespace _21s5_df_32_proj.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}