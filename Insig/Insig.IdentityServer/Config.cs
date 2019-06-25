using System.Collections.Generic;
using IdentityServer4.Models;

namespace Insig.IdentityServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("insigapi", "Resource Insig API")
                {
                    Scopes = {new Scope("insigapi.read") }
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client {
                    RequireConsent = false, // change to true if you want to see consent page after log in
                    ClientId = "insig_spa",
                    ClientName = "Insig SPA",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes = { "openid", "profile", "email", "insigapi.read" },
                    RedirectUris = {"https://localhost:5002/auth-callback"},
                    PostLogoutRedirectUris = {"https://localhost:5002/"},
                    AllowedCorsOrigins = {"https://localhost:5002"},
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}
