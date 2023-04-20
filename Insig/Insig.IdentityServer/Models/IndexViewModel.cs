namespace Insig.IdentityServer.Models;

public class IndexViewModel
{
    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public bool PhoneNumberConfirmed { get; set; }

    public string ReturnUrl { get; set; }
}