using EnsureThat;

namespace Insig.Domain.Samples
{
    public class Sample
    {
        public Sample(string name)
        {
            EnsureArg.IsNotNullOrWhiteSpace(name, nameof(name));

            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
