using System;
using System.IO;
using Insig.IdentityServer.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Insig.IdentityServer.Infrastructure;

public class AppIdentityDbContext : IdentityDbContext<AppUser>, IDesignTimeDbContextFactory<AppIdentityDbContext>
{
    private const string ConnectionStringName = "Identity";

    public AppIdentityDbContext()
    {
    }

    public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
    {
    }

    public AppIdentityDbContext CreateDbContext(string[] args)
    {
        return CreateContext(
            Directory.GetCurrentDirectory(),
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole
            {
                Name = Common.Auth.Roles.Consumer,
                NormalizedName = Common.Auth.Roles.Consumer.ToUpper()
            }
        );
    }

    private static AppIdentityDbContext CreateContext(string basePath, string environmentName)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile(string.IsNullOrEmpty(environmentName) ?
                "appsettings.json" :
                $"appsettings.{environmentName}.json")
            .AddEnvironmentVariables()
            .Build();

        var connectionString = configuration.GetConnectionString(ConnectionStringName);
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException($"Could not find a connection string named '{ConnectionStringName}'.");
        }

        var builder = new DbContextOptionsBuilder<AppIdentityDbContext>()
            .UseSqlServer(connectionString);

        return new AppIdentityDbContext(builder.Options);
    }
}