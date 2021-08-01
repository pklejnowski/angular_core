using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Insig.Web.Infrastructure
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class AppConfig
    {
        public string IdentityUrl { get; set; }
        public string ApiUrl { get; set; }
        public string ClientUrl { get; set; }
    }
}
