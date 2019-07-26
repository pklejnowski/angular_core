using System;
using System.IO;
using Insig.Infrastructure.DataModel.Context;
using Insig.Integration.Tests.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Insig.Integration.Tests.Utility
{
    public class CustomWebApplicationFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint> where TEntryPoint : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            var appsettingsFileName = "appsettings.json";

            builder.ConfigureServices(services =>
            {
                var serviceProvider = new ServiceCollection()
                    .AddEntityFrameworkSqlServer()
                    .BuildServiceProvider();

                var connectionString = new ConfigurationBuilder()
                     .AddJsonFile(appsettingsFileName)
                     .Build()
                     .GetConnectionString("Default");

                if (!connectionString.ToLower().Contains("test"))
                {
                    throw new Exception($"Live database used in tests. Ensure that ConnectionString is valid: {connectionString}");
                }

                services.AddDbContext<InsigContext>(options =>
                {
                    options.UseSqlServer(connectionString);
                    options.UseInternalServiceProvider(serviceProvider);
                }, ServiceLifetime.Singleton);

                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var appDb = scopedServices.GetRequiredService<InsigContext>();

                    CleanUpDatabase(appDb);
                    appDb.Database.Migrate();

                    try
                    {
                        // Seed the database with some specific test data.
                        DataHelper.PopulateTestData(appDb);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"An error occurred seeding the database with test messages. Error: {ex.InnerException.Message}");
                    }
                }
            }).ConfigureAppConfiguration((context, conf) =>
            {
                conf.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), appsettingsFileName));
            });
        }

        private static void CleanUpDatabase(InsigContext appDb)
        {
            if (appDb.Database.CanConnect())
            {
                foreach (var tableName in DataHelper.GetTableNames())
                {
                    var tableToRemove = $"DELETE FROM {tableName}";
                    appDb.Database.ExecuteSqlCommand(tableToRemove);
                }
            }
        }
    }
}
