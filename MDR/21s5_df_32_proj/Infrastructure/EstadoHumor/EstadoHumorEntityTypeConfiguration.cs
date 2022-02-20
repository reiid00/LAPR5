using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using _21s5_df_32_proj.Domain.EstadosHumor;

namespace _21s5_df_32_proj.Infrastructure.EstadosHumor
{
    internal class EstadoHumorEntityTypeConfiguration : IEntityTypeConfiguration<EstadoHumor>
    {
        public void Configure(EntityTypeBuilder<EstadoHumor> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("EstadoHumor", SchemaNames._21s5_df_32_proj);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.DescricaoEstadoHumor);
            builder.OwnsOne(b => b.Icon);
            builder.OwnsOne(b => b.Nome);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}