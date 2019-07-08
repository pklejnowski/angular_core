using System;
using Insig.Common.Exceptions;
using Insig.Domain.Samples;
using Shouldly;
using Xunit;

namespace Insig.Domain.Tests
{
    public class SampleTests
    {
        [Fact]
        public void Sample_WhenCreatingNewSampleValueWithCorrectData_ThenSampleIsCreated()
        {
            // given
            string valueName = "BlaBla";

            // when
            var sample = new Sample(valueName);

            // then
            sample.ShouldNotBeNull();
            sample.Name.ShouldBe(valueName);
        }

        [Fact]
        public void Sample_WhenCreatingNewSampleValueWithEmptyData_ThenExceptionIsThrown()
        {
            // given
            string valueName1 = "";
            string valueName2 = " ";
            string valueName3 = null;

            // when then
            Should.Throw<ArgumentException>(() => new Sample(valueName1));
            Should.Throw<ArgumentException>(() => new Sample(valueName2));
            Should.Throw<ArgumentException>(() => new Sample(valueName3));
        }

        [Fact]
        public void Sample_WhenCreatingNewSampleValueWithInvalidData_ThenExceptionIsThrown()
        {
            // given
            string valueName1 = "test";
            string valueName2 = "xtestx";
            string valueName3 = "xTestx";

            // when then
            Should.Throw<DomainException>(() => new Sample(valueName1)).Message.ShouldContain("not allowed");
            Should.Throw<DomainException>(() => new Sample(valueName2)).Message.ShouldContain("not allowed");
            Should.Throw<DomainException>(() => new Sample(valueName3)).Message.ShouldContain("not allowed");
        }
    }
}
