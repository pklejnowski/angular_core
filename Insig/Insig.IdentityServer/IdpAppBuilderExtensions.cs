using Microsoft.AspNetCore.Builder;

namespace Insig.IdentityServer
{
    public static class IdpAppBuilderExtensions
    {
        public static IApplicationBuilder UseContentSecurityPolicyHttpHeader(this IApplicationBuilder application)
        {
            return application.UseCsp(options =>
            {
                options
                    .DefaultSources(x => x.None())
                    .ConnectSources(x => x.Self())
                    .FontSources(x => x.Self())
                    .FrameSources(x => x.Self())
                    .ImageSources(x => x.Self())
                    .ScriptSources(x => x.Self())
                    .StyleSources(x =>
                    {
                        x.Self();
                        x.UnsafeInline();
                    })
                    .UpgradeInsecureRequests();
            });
        }
    }
}
