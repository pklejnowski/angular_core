using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Insig.Api;
using Insig.Domain.Samples;
using Insig.Integration.Tests.Utility;
using Newtonsoft.Json;
using Shouldly;
using Xunit;

namespace Insig.Integration.Tests
{
    public class ValuesControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ValuesControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Sample_WhenGettingSampleData_ThenAllAreReturned()
        {
            // when
            var httpResponse = await _client.GetAsync("/values/sample");

            // then
            httpResponse.EnsureSuccessStatusCode();

            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var samples = JsonConvert.DeserializeObject<List<Sample>>(stringResponse);

            samples.ShouldAllBe(sample => sample.Name.Contains("Sample_"));
        }


        //[Fact]
        //public async Task CanGetPlayerById()
        //{
        //    // The endpoint or route of the controller action.
        //    var httpResponse = await _client.GetAsync("/api/players/1");

        //    // Must be successful.
        //    httpResponse.EnsureSuccessStatusCode();

        //    // Deserialize and examine results.
        //    var stringResponse = await httpResponse.Content.ReadAsStringAsync();
        //    var player = JsonConvert.DeserializeObject<Sample>(stringResponse);
        //    Assert.Equal(1, player.Id);
        //    Assert.Equal("Wayne", player.FirstName);
        //}
    }
}
