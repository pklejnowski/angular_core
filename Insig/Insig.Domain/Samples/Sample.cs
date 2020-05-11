using EnsureThat;
using Insig.Common.Exceptions;
using Insig.Domain.Common;

namespace Insig.Domain.Samples
{
    public class Sample : AuditableEntity
    {
        public Sample(string name)
        {
            EnsureThatNameIsCorrect(name);

            Name = name;
        }

        public int Id { get; }

        public string Name { get; private set; }

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
