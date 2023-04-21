using Insig.Domain.Samples;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Insig.Infrastructure.DataModel.Mappings;

public class SampleConfiguration : IEntityTypeConfiguration<Sample>
{
    public void Configure(EntityTypeBuilder<Sample> builder)
    {
        builder.ToTable("Sample");
        builder.HasKey(e => e.Id);
    }
}