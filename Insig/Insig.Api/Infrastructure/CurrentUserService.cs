using IdentityModel;
using Insig.Common.Auth;
using Microsoft.AspNetCore.Http;

namespace Insig.Api.Infrastructure
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.FindFirst(JwtClaimTypes.Subject)?.Value;
        }

        public string UserId { get; }
    }
}
