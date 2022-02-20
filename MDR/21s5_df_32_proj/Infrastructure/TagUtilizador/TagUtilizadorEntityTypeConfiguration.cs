using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Infrastructure.Utilizadores
{
    internal class TagUtilizadorEntityTypeConfiguration : IEntityTypeConfiguration<TagUtilizador>
    {
        public void Configure(EntityTypeBuilder<TagUtilizador> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Utilizador", SchemaNames._21s5_df_32_proj);
            builder.HasKey(b => b.Id);
            builder.HasKey(b => new { b.TagId, b.UtilizadorId });
            
            builder.HasOne<Utilizador>(b=>b.Utilizador)
            .WithMany(u=>u.TagUtilizadores)
            .HasForeignKey(b=>b.UtilizadorId);

            builder.HasOne<Tag>(b=>b.Tag)
            .WithMany(u=>u.TagUtilizadores)
            .HasForeignKey(b=>b.TagId);
            
           // builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}