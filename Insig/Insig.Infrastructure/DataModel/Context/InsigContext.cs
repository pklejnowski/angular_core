using System.IO;
using Insig.Domain.Samples;
using Insig.Infrastructure.DataModel.Mappings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Insig.Infrastructure.DataModel.Context
{
    public class InsigContext : DbContext
    {
        public InsigContext() { }

        public InsigContext(DbContextOptions<InsigContext> options) : base(options)
        {
        }

        public DbSet<Sample> Samples { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new SampleConfiguration());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                optionsBuilder.UseSqlServer(configuration.GetConnectionString("Default"));
            }
        }
    }
}
