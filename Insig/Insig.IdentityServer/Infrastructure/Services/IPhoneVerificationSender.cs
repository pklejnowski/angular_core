using System.Threading.Tasks;
using Twilio.Rest.Preview.AccSecurity.Service;

namespace Insig.IdentityServer.Infrastructure.Services
{
    public interface IPhoneVerificationSender
    {
        Task<VerificationResource> SendVeryficationCode(string phoneNumber);
        Task<VerificationCheckResource> VerifyCode(string phoneNumber, string code);
    }
}
