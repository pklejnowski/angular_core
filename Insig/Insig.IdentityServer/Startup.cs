using System;
using System.Net;
using IdentityServer4.Services;
using Insig.Common.Configuration;
using Insig.IdentityServer.Extensions;
using Insig.IdentityServer.Infrastructure;
using Insig.IdentityServer.Infrastructure.Data;
using Insig.IdentityServer.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Twilio;

namespace Insig.IdentityServer;

public class Startup
{
    private const string CertificateConfigKey = "jwtCertificateThumbprint";

    private readonly IWebHostEnvironment _env;
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
        _env = env;
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Identity")));

        services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireDigit = true;
                options.SignIn.RequireConfirmedEmail = true;
                options.User.RequireUniqueEmail = true;
                options.User.AllowedUserNameCharacters = null;

                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                options.Lockout.MaxFailedAccessAttempts = 5;
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddDefaultTokenProviders();

        services.AddIdentityServer(options => { options.Authentication.CookieLifetime = TimeSpan.FromMinutes(10); })
            .AddCertificate(_env.IsDevelopment(), Configuration[CertificateConfigKey])
            .AddInMemoryPersistedGrants()
            .AddInMemoryIdentityResources(Config.GetIdentityResources())
            .AddInMemoryApiResources(Config.GetApiResources())
            .AddInMemoryApiScopes(Config.GetApiScopes())
            .AddInMemoryClients(Config.GetClients(Configuration["AppConfig:ClientUrl"]))
            .AddAspNetIdentity<AppUser>();

        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.Name = "Insig.Session";
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        });

        services.Configure<CookieAuthenticationOptions>(IdentityConstants.TwoFactorRememberMeScheme,
            options =>
            {
                options.Cookie.Name = "Insig.2faCookie";
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

        services.Configure<CookieAuthenticationOptions>(IdentityConstants.TwoFactorUserIdScheme,
            options =>
            {
                options.Cookie.Name = "Insig.2faUserIdCookie";
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

        services.Configure<CookieAuthenticationOptions>(IdentityConstants.ExternalScheme,
            options =>
            {
                options.Cookie.Name = "Insig.External";
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

        services.AddAntiforgery(options =>
        {
            options.Cookie.Name = "Insig.Antiforgery";
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        });

        services.Configure<CookieTempDataProviderOptions>(options =>
        {
            options.Cookie.Name = "Insig.TempCookie";
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        });

        services.Configure<DataProtectionTokenProviderOptions>(options =>
        {
            options.TokenLifespan = TimeSpan.FromMinutes(15);
        });

        services.Configure<SecurityStampValidatorOptions>(options =>
        {
            options.ValidationInterval = TimeSpan.FromSeconds(60);
        });

        services.AddTransient<IEmailSender, EmailSender>();
        services.AddTransient<IPhoneVerificationSender, PhoneVerificationSender>();
        services.AddTransient<IProfileService, IdentityClaimsProfileService>();

        services.Configure<AppConfig>(Configuration.GetSection("AppConfig"));
        services.Configure<AuthMessageSenderOptions>(options => Configuration.GetSection("SendGridEmailSettings").Bind(options));
        services.Configure<TwilioVerifySettings>(Configuration.GetSection("Twilio"));

        var accountSid = Configuration["Twilio:AccountSID"];
        var authToken = Configuration["Twilio:AuthToken"];
        TwilioClient.Init(accountSid, authToken);

        services.AddRazorPages().AddRazorRuntimeCompilation();
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
        app.UseCors(b => b.WithOrigins(Configuration["AppConfig:ClientUrl"]).AllowAnyHeader().AllowAnyMethod());

        app.UseIdentityServer();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        });
    }
}