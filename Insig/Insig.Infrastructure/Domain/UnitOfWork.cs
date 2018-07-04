using System;
using EnsureThat;
using Insig.Common.Exceptions;
using Insig.Domain;
using Insig.Infrastructure.DataModel.Context;

namespace Insig.Infrastructure.Domain
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly InsigContext _context;

        public UnitOfWork(InsigContext context)
        {
            EnsureArg.IsNotNull(context, nameof(context));

            _context = context;
        }

        public void Save()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new DatabaseException(ex.Message, ex.InnerException);
            }
        }
    }
}
