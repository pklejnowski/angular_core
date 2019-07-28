using System;
using System.Net.Http;
using Insig.Api;
using Insig.Infrastructure.DataModel.Context;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Insig.Integration.Tests.Utility
{
    public abstract class TestHostFixture : IClassFixture<CustomWebApplicationFactory<TestStartup, Startup>>
    {
        private readonly CustomWebApplicationFactory<TestStartup, Startup> _factory;
        protected readonly HttpClient Client;

        protected TestHostFixture()
        {
            _factory = new CustomWebApplicationFactory<TestStartup, Startup>();
            Client = _factory.CreateClient();
        }

        protected void GetContext(Action<InsigContext> test)
        {
            using (var scope = _factory.Server.Host.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<InsigContext>();
                test(context);
            }
        }
    }
}
