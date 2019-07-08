using EnsureThat;
using Insig.Common.Exceptions;

namespace Insig.Domain.Samples
{
    public class Sample
    {
        public Sample(string name)
        {
            EnsureThatNameIsCorrect(name);

            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }

        private void EnsureThatNameIsCorrect(string name)
        {
            EnsureArg.IsNotNullOrWhiteSpace(name, nameof(name));

            if (name.ToLower().Contains("test"))
            {
                throw new DomainException($"Sample value with name: {name} is not allowed.");
            }
        }
    }
}
