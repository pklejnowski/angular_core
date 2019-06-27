using System.Collections.Generic;
using IdentityServer4;
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
                new Client
                {
                    RequireConsent = false, // change to true if you want to see consent page after log in
                    ClientId = "insig_spa",
                    ClientName = "Insig SPA",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "insigapi.read"
                    },
                    RedirectUris =
                    {
                        "https://localhost:5002/auth-callback",
                        "https://localhost:5002/assets/silent-refresh.html"
                    },
                    PostLogoutRedirectUris = {"https://localhost:5002/logout"},
                    AllowedCorsOrigins = {"https://localhost:5002"},
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 300,
                    AccessTokenType = AccessTokenType.Jwt,
                    AlwaysIncludeUserClaimsInIdToken = true
                }
            };
        }
    }
}
