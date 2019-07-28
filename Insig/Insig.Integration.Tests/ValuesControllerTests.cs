using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Insig.Common.Exceptions;
using Insig.Domain.Samples;
using Insig.Integration.Tests.Utility;
using Insig.PublishedLanguage.Commands;
using Newtonsoft.Json;
using Shouldly;
using Xunit;

namespace Insig.Integration.Tests
{
    public class ValuesControllerTests : TestHostFixture
    {
        [Theory]
        [InlineData("/values/sample")]
        public async Task Sample_WhenGettingSampleData_ThenAllAreReturned(string url)
        {
            // when
            var httpResponse = await Client.GetAsync(url);

            // then
            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var samples = JsonConvert.DeserializeObject<List<Sample>>(stringResponse);

            samples.ShouldAllBe(sample => sample.Name.Contains("Sample_"));
        }

        [Theory]
        [InlineData("/values/sample")]
        public async Task Sample_WhenCreatingSampleData_ThenIsAddedToDatabase(string url)
        {
            // given
            var command = new AddSampleCommand { Name = "Ble" };

            // when
            var httpResponse = await Client.PostAsJsonAsync(url, command);

            // then
            httpResponse.EnsureSuccessStatusCode();

            GetContext(dbContext =>
            {
                dbContext.Samples.FirstOrDefault(x => x.Name == "Ble").ShouldNotBeNull();
            });
        }

        [Theory]
        [InlineData("/values/sample")]
        public void Sample_WhenCreatingInvalidSampleData_ThenExceptionIsThrown(string url)
        {
            // given
            var command = new AddSampleCommand { Name = "test" };

            // when then
            Should.Throw<DomainException>(() => Client.PostAsJsonAsync(url, command)).Message.ShouldContain("is not allowed");
        }

        [Theory]
        [InlineData("/values/sample")]
        public async Task Sample_WhenCreatingDuplicatedSampleData_ThenExceptionIsThrown(string url)
        {
            // given
            var command1 = new AddSampleCommand { Name = "Ble" };
            var command2 = new AddSampleCommand { Name = "Ble" };

            // when
            var httpResponse1 = await Client.PostAsJsonAsync(url, command1);
            httpResponse1.EnsureSuccessStatusCode();

            // then
            Should.Throw<DomainException>(() => Client.PostAsJsonAsync(url, command2)).Message.ShouldContain("already exist");
        }
    }
}
