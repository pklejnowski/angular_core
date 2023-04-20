using Insig.IdentityServer.Infrastructure.Data;

namespace Insig.IdentityServer.Models;

public class RegisterResponseViewModel
{
    public string Id { get; set; }
    public string Email { get; set; }

    public RegisterResponseViewModel(AppUser user)
    {
        Id = user.Id;
        Email = user.Email;
    }
}