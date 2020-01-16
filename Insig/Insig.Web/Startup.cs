using Insig.Common.Configuration;
using Insig.Web.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace Insig.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore();

            services.Configure<AppUrls>(Configuration.GetSection("AppUrls"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptions<AppUrls> appUrls)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseContentSecurityPolicyHttpHeader(appUrls.Value);
            }

            app.RemoveServerHeader();
            app.UseWebAppSecurityHttpHeaders();
            app.UseStrictTransportSecurityHttpHeader(env);

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseStatusCodePagesWithReExecute("/");
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
