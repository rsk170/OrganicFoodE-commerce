using Basis.Entities.OrderClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Data.Config
{
    public class ShippingOptionConfiguration : IEntityTypeConfiguration<ShippingOption>
    {
        public void Configure(EntityTypeBuilder<ShippingOption> builder)
        {
            builder.Property(d => d.Price).HasColumnType("decimal(18,2)");
        }
    }
}