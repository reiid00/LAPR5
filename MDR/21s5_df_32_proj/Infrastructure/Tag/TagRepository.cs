using _21s5_df_32_proj.Infrastructure.Shared;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Infrastructure.Tags
{
    public class TagRepository : BaseRepository<Tag, TagID>, ITagRepository
    {
    
        public TagRepository(_21s5_df_32_projDbContext context):base(context.Tag)
        {
           
        }


    }
}