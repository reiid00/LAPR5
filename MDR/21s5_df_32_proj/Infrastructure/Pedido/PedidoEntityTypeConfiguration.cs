using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using _21s5_df_32_proj.Domain.Pedidos;

namespace _21s5_df_32_proj.Infrastructure.Pedidos
{
    internal class PedidoEntityTypeConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Pedido", SchemaNames._21s5_df_32_proj);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.PedidoIntroducao);
            builder.OwnsOne(b => b.PedidoLigacao);
            builder.OwnsOne(b => b.TituloPedido);
            builder.OwnsOne(b => b.DescricaoPedido);
            builder.OwnsOne(b => b.EstadoPedido);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}