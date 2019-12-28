using System.Linq;
using Insig.Common.Auth;
using Microsoft.AspNetCore.Http;

namespace Insig.ApplicationServices
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            User = httpContextAccessor.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        }

        public string User { get; }
    }
}
