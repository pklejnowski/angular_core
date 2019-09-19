using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Twilio.Rest.Preview.AccSecurity.Service;

namespace Insig.IdentityServer.Infrastructure.Services
{
    public class PhoneVerificationSender : IPhoneVerificationSender
    {
        private readonly TwilioVerifySettings _settings;

        public PhoneVerificationSender(IOptions<TwilioVerifySettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task<VerificationResource> SendVeryficationCode(string phoneNumber)
        {
            return await VerificationResource.CreateAsync(
                to: phoneNumber,
                channel: "sms",
                pathServiceSid: _settings.VerificationServiceSID
            );
        }

        public async Task<VerificationCheckResource> VerifyCode(string phoneNumber, string code)
        {
            return await VerificationCheckResource.CreateAsync(
                 to: phoneNumber,
                 code: code,
                 pathServiceSid: _settings.VerificationServiceSID
             );
        }
    }
}
