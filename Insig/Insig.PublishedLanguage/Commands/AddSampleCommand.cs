using Insig.Common.CQRS;

namespace Insig.PublishedLanguage.Commands;

public class AddSampleCommand : ICommand
{
    public string Name { get; set; }
}