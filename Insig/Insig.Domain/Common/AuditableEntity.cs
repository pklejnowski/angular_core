using System;

namespace Insig.Domain.Common;

public class AuditableEntity
{
    public string CreatedBy { get; set; }

    public DateTime CreatedOn { get; set; }

    public string UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }
}