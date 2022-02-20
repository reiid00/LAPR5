using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Infrastructure.Utilizadores
{
    internal class UtilizadorEntityTypeConfiguration : IEntityTypeConfiguration<Utilizador>
    {
        public void Configure(EntityTypeBuilder<Utilizador> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Utilizador", SchemaNames._21s5_df_32_proj);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.Nome);

            builder.OwnsOne(b => b.Email,email => 
            {
            email.Property(b=>b.MyUtilizadorEmail);
            email.HasIndex(b=>b.MyUtilizadorEmail);
            });
            builder.OwnsOne(b => b.DataNascimento);
            builder.OwnsOne(b => b.Password);
            builder.OwnsOne(b => b.Pontuacao);
            builder.OwnsOne(b => b.NumTelemovel);
            builder.OwnsOne(b => b.Descricao);
            builder.OwnsOne(b => b.Avatar);
            builder.OwnsOne(b => b.Pais);
            builder.OwnsOne(b => b.Cidade);
            builder.HasOne(b => b.EstadoHumor).WithMany().HasForeignKey(p=>p.EstadoHumorId);
            
           // builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}