using System;
using System.Net;
using IdentityServer4.Services;
using Insig.Common.Configuration;
using Insig.IdentityServer.Extensions;
using Insig.IdentityServer.Infrastructure;
using Insig.IdentityServer.Infrastructure.Data;
using Insig.IdentityServer.Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Twilio;

namespace Insig.IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));

            services.AddIdentity<AppUser, IdentityRole>(options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireDigit = false;
                    options.SignIn.RequireConfirmedEmail = true;
                })
                .AddEntityFrameworkStores<AppIdentityDbContext>()
                .AddDefaultTokenProviders();

            services.AddIdentityServer(options => { options.Authentication.CookieLifetime = TimeSpan.FromMinutes(10); })
                .AddDeveloperSigningCredential() // Only for dev purpose! http://amilspage.com/signing-certificates-idsv4/
                .AddInMemoryPersistedGrants()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients(Configuration["AppUrls:ClientUrl"]))
                .AddAspNetIdentity<AppUser>();

            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IPhoneVerificationSender, PhoneVerificationSender>();
            services.AddTransient<IProfileService, IdentityClaimsProfileService>();

            services.Configure<AuthMessageSenderOptions>(options => Configuration.GetSection("SendGridEmailSettings").Bind(options));
            services.Configure<TwilioVerifySettings>(Configuration.GetSection("Twilio"));
            var accountSid = Configuration["Twilio:AccountSID"];
            var authToken = Configuration["Twilio:AuthToken"];
            TwilioClient.Init(accountSid, authToken);

            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()));

            services.AddRazorPages();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    if (error != null)
                    {
                        context.Response.AddApplicationError(error.Error.Message);
                        await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                    }
                });
            });

            var serilog = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .Enrich.FromLogContext()
                .WriteTo.File(@"authserver_log.txt");

            loggerFactory.WithFilter(new FilterLoggerSettings
            {
                {"Microsoft", LogLevel.Warning},
                {"System", LogLevel.Warning}
            }).AddSerilog(serilog.CreateLogger());

            app.RemoveServerHeader();
            app.UseStrictTransportSecurityHttpHeader(env);
            app.UseIdentityServer();
            app.UseContentSecurityPolicyHttpHeader();
            app.UseWebAppSecurityHttpHeaders();

            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("AllowAll");

            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
