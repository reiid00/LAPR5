using Microsoft.EntityFrameworkCore;
using _21s5_df_32_proj.Domain.EstadosHumor;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Pedidos;
using _21s5_df_32_proj.Domain.Relations;
using _21s5_df_32_proj.Domain.Tags;
using _21s5_df_32_proj.Infrastructure.EstadosHumor;
using _21s5_df_32_proj.Infrastructure.Utilizadores;
using _21s5_df_32_proj.Infrastructure.Pedidos;
using _21s5_df_32_proj.Infrastructure.Relations;
using _21s5_df_32_proj.Infrastructure.Tags;

namespace _21s5_df_32_proj.Infrastructure
{
    public class _21s5_df_32_projDbContext : DbContext
    {
        public DbSet<EstadoHumor> EstadoHumor { get; set; }

        public DbSet<Utilizador> Utilizador { get; set; }

        public DbSet<Pedido> Pedido { get; set;}

        public DbSet<Relation> Relation {get; set;}

        public DbSet<Tag> Tag {get; set;}

        public DbSet<TagUtilizador> TagUtilizador {get; set;}

       public _21s5_df_32_projDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("_21s5_df_32_proj");
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new EstadoHumorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UtilizadorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RelationEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TagEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TagUtilizadorEntityTypeConfiguration());
            
        }
    }
}