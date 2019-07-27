using System.Security.Claims;
using Insig.Api;
using Insig.Common.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Insig.Integration.Tests.Utility
{
    public class TestStartup : Startup
    {
        public TestStartup(IConfiguration configuration) : base(configuration)
        {
        }

        public override void ConfigureAuth(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "Test Scheme";
                options.DefaultChallengeScheme = "Test Scheme";
            }).AddTestAuth(o => { });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.ApiReader, policy => policy.RequireClaim("scope", Scopes.InsigApi));
                options.AddPolicy(Policies.Consumer, policy => policy.RequireClaim(ClaimTypes.Role, Roles.Consumer));
            });
        }
    }
}
