using System;
using System.Security.Claims;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using IdentityServer4.AccessTokenValidation;
using Insig.Api.Infrastructure;
using Insig.Common.Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace Insig.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddAuthorization()
                .AddJsonFormatters();

            services.AddCors();

            ConfigureAuth(services);

            return new AutofacServiceProvider(ContainerBuilder(services).Build());
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            var serilog = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .Enrich.FromLogContext()
                .WriteTo.File(@"api_log.txt");

            loggerFactory.WithFilter(new FilterLoggerSettings
            {
                {"Microsoft", LogLevel.Warning},
                {"System", LogLevel.Warning}
            }).AddSerilog(serilog.CreateLogger());

            app.UseCors(b => b.WithOrigins(Configuration["AppUrls:ClientUrl"]).AllowAnyHeader().AllowAnyMethod());
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
        }

        public virtual void ConfigureAuth(IServiceCollection services)
        {
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = Configuration["AppUrls:IdentityUrl"];
                    options.RequireHttpsMetadata = true;
                    options.ApiName = Instances.InsigApi;
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.ApiReader, policy => policy.RequireClaim("scope", Scopes.InsigApi));
                options.AddPolicy(Policies.Consumer, policy => policy.RequireClaim(ClaimTypes.Role, Roles.Consumer));
            });
        }

        private ContainerBuilder ContainerBuilder(IServiceCollection services)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterModule(new DefaultModule(Configuration.GetConnectionString("Default")));
            containerBuilder.Populate(services);

            return containerBuilder;
        }
    }
}
