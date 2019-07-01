using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using Insig.Common.Auth;

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
                new ApiResource(Instances.InsigApi, "Resource Insig API")
                {
                    Scopes = {new Scope(Scopes.InsigApi) }
                }
            };
        }

        public static IEnumerable<Client> GetClients(string clientUrl)
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
                        Scopes.InsigApi
                    },
                    RedirectUris =
                    {
                        clientUrl + "/auth-callback",
                        clientUrl + "/assets/silent-refresh.html"
                    },
                    PostLogoutRedirectUris = { clientUrl + "/logout" },
                    AllowedCorsOrigins = { clientUrl },
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 300,
                    AccessTokenType = AccessTokenType.Jwt,
                    AlwaysIncludeUserClaimsInIdToken = true
                }
            };
        }
    }
}
