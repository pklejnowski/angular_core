using Microsoft.AspNetCore.Builder;

namespace Insig.Web.Infrastructure
{
    public static class ClientAppBuilderExtensions
    {
        public static IApplicationBuilder UseContentSecurityPolicyHttpHeader(this IApplicationBuilder application, AppUrls appUrls)
        {
            return application.UseCsp(options =>
            {
                options
                    .DefaultSources(x => x.None())
                    .ConnectSources(x =>
                    {
                        x.Self();
                        x.CustomSources(appUrls.AuthorizationUrl, appUrls.ApiUrl);
                    })
                    .FrameSources(x =>
                    {
                        x.Self();
                        x.CustomSources(appUrls.AuthorizationUrl);
                    })
                    .FontSources(x => x.Self())
                    .ImageSources(x =>
                    {
                        x.Self();
                        x.CustomSources("data:");
                    })
                    .ScriptSources(x => x.Self())
                    .StyleSources(
                        x =>
                        {
                            x.Self();
                            x.UnsafeInlineSrc = true;
                        })
                    .FormActions(s => s.Self())
                    .FrameAncestors(s => s.Self())
                    .UpgradeInsecureRequests();
            });
        }
    }
}
