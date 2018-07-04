using System;

namespace Insig.Common.Exceptions
{
    public class DomainException : Exception
    {
        public DomainException(string message)
            : base(message)
        {
        }
    }
}
