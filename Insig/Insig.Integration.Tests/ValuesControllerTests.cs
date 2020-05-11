using System;
using System.Collections.Generic;
using System.Linq;
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
        [InlineData("/values/samples")]
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
        [InlineData("/values/samples")]
        public async Task Sample_WhenCreatingSampleData_ThenIsAddedToDatabase(string url)
        {
            // given
            var command = new AddSampleCommand { Name = "Ble" };

            // when
            var httpResponse = await Client.PostAsync(url, command);

            // then
            httpResponse.EnsureSuccessStatusCode();

            GetContext(dbContext =>
            {
                var result = dbContext.Samples.First(x => x.Name == "Ble");
                result.CreatedBy.ShouldBe("1a2b3c");
                result.CreatedOn.ShouldBe(DateTime.Now, TimeSpan.FromSeconds(1));
                result.UpdatedBy.ShouldBeNull();
                result.UpdatedOn.ShouldBeNull();
            });
        }

        [Theory]
        [InlineData("/values/samples")]
        public void Sample_WhenCreatingInvalidSampleData_ThenExceptionIsThrown(string url)
        {
            // given
            var command = new AddSampleCommand { Name = "test" };

            // when then
            Should.Throw<DomainException>(() => Client.PostAsync(url, command)).Message.ShouldContain("is not allowed");
        }

        [Theory]
        [InlineData("/values/samples")]
        public async Task Sample_WhenCreatingDuplicatedSampleData_ThenExceptionIsThrown(string url)
        {
            // given
            var command1 = new AddSampleCommand { Name = "Ble" };
            var command2 = new AddSampleCommand { Name = "Ble" };

            // when
            var httpResponse1 = await Client.PostAsync(url, command1);
            httpResponse1.EnsureSuccessStatusCode();

            // then
            Should.Throw<DomainException>(() => Client.PostAsync(url, command2)).Message.ShouldContain("already exist");
        }
    }
}
