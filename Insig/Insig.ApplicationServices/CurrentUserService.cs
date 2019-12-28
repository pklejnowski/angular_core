using System.Linq;
using Insig.Common.Auth;
using Microsoft.AspNetCore.Http;

namespace Insig.ApplicationServices
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
        }

        public string UserId { get; }
    }
}
