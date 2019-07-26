using System.Net.Http;
using Insig.Api;
using Insig.Infrastructure.DataModel.Context;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Insig.Integration.Tests.Utility
{
    public abstract class TestHostFixture : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly IServiceScopeFactory _scopeFactory;
        public readonly HttpClient Client;

        protected TestHostFixture()
        {
            var factory = new CustomWebApplicationFactory<Startup>();

            Client = factory.CreateClient();
            _scopeFactory = factory.Server.Host.Services.GetService<IServiceScopeFactory>();
        }

        protected InsigContext GetContext()
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                return scope.ServiceProvider.GetService<InsigContext>();
            }
        }
    }
}
