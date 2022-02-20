using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Infrastructure.Tags
{
    internal class TagEntityTypeConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Utilizador", SchemaNames._21s5_df_32_proj);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.Titulo);
           // builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}