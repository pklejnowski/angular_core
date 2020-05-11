using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;


namespace Insig.Common.Configuration
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder RemoveServerHeader(this IApplicationBuilder application)
        {
            return application.Use(async (context, next) =>
            {
                context.Response.Headers.Remove("Server");
                await next();
            });
        }

        public static IApplicationBuilder UseApiSecurityHttpHeaders(this IApplicationBuilder application)
        {
            return application
                    .UseCommonSecurityHttpHeaders()
                    .UseXfo(options => options.Deny());
        }

        public static IApplicationBuilder UseWebAppSecurityHttpHeaders(this IApplicationBuilder application)
        {
            return application
                   .UseCommonSecurityHttpHeaders()
                   .UseXfo(options => options.SameOrigin())
                   .UseReferrerPolicy(options => options.StrictOriginWhenCrossOrigin())
                   .UseXXssProtection(options => options.EnabledWithBlockMode());
        }

        public static IApplicationBuilder UseStrictTransportSecurityHttpHeader(this IApplicationBuilder application, IWebHostEnvironment hostingEnvironment)
        {
            return hostingEnvironment.IsDevelopment()
                ? application
                : application.UseHsts(options => options.MaxAge(18 * 7).IncludeSubdomains());
        }

        public static IApplicationBuilder UseBlockingContentSecurityPolicyHttpHeader(this IApplicationBuilder application)
        {
            return application.UseCsp(options => options.DefaultSources(x => x.None()));
        }

        private static IApplicationBuilder UseCommonSecurityHttpHeaders(this IApplicationBuilder application)
        {
            return application
                .UseXContentTypeOptions()
                .UseXDownloadOptions();
        }
    }
}
