using System.Threading.Tasks;
using Insig.ApplicationServices.Boundaries;
using Insig.Common.CQRS;
using Insig.Domain;
using Insig.Domain.Samples;
using Insig.PublishedLanguage.Commands;

namespace Insig.ApplicationServices.UseCases
{
    public class AddSampleUseCase : ICommandHandler<AddSampleCommand>
    {
        private readonly ISampleRepository _sampleRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AddSampleUseCase(ISampleRepository sampleRepository, IUnitOfWork unitOfWork)
        {
            _sampleRepository = sampleRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(AddSampleCommand command)
        {
            _sampleRepository.EnsureThatSampleDoesNotExist(command.Name);

            _sampleRepository.Store(new Sample(command.Name));
            await _unitOfWork.Save();
        }
    }
}
