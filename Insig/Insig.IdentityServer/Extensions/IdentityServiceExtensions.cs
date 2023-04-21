using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.DependencyInjection;

namespace Insig.IdentityServer.Extensions;

public static class IdentityServiceExtensions
{
    public static IIdentityServerBuilder AddCertificate(this IIdentityServerBuilder builder, bool isDevelopment, string certificateConfigKey)
    {
        if (isDevelopment || string.IsNullOrWhiteSpace(certificateConfigKey))
        {
            return builder.AddDeveloperSigningCredential();
        }
        else
        {
            X509Certificate2 cert = null;
            using (X509Store certStore = new X509Store(StoreName.My, StoreLocation.CurrentUser))
            {
                certStore.Open(OpenFlags.ReadOnly);
                X509Certificate2Collection certCollection = certStore.Certificates.Find(
                    X509FindType.FindByThumbprint,
                    certificateConfigKey,
                    false
                );

                if (certCollection.Count > 0)
                {
                    cert = certCollection[0];
                }
            }

            return builder.AddSigningCredential(cert);
        }
    }
}