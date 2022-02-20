using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using _21s5_df_32_proj.Domain.Relations;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Infrastructure.Relations
{
    internal class RelationEntityTypeConfiguration : IEntityTypeConfiguration<Relation>
    {
        public void Configure(EntityTypeBuilder<Relation> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Relations", SchemaNames._21s5_df_32_proj);
            builder.HasKey(b => b.Id);
            // builder.OwnsOne(b => b.RelationTypes, dt => {
            //     dt.WithOwner().HasForeignKey("RelationTypeId");
            //     dt.Property<int>("Id");
            //     dt.HasKey("Id");
            // });
            builder.OwnsMany(b => b.RelationTypes, dt => {
                dt.WithOwner().HasForeignKey("RelationTypeId");
                dt.Property<int>("Id");
                dt.HasKey("Id");
            });
            builder.OwnsOne(b=>b.Strength);
            builder.HasOne(b=>b.User1).WithMany().HasForeignKey(b=>b.UserID1);
            builder.HasOne(b=>b.User2).WithMany().HasForeignKey(b=>b.UserID2);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}