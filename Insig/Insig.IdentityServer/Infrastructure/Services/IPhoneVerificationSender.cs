using System.Threading.Tasks;
using Twilio.Rest.Verify.V2.Service;

namespace Insig.IdentityServer.Infrastructure.Services;

public interface IPhoneVerificationSender
{
    Task<VerificationResource> SendVeryficationCode(string phoneNumber);
    Task<VerificationCheckResource> VerifyCode(string phoneNumber, string code);
}