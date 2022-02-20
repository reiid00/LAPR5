using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Infrastructure.Shared
{
    public class EntityIdValueConverter<TTypedIdValue> : ValueConverter<TTypedIdValue, String>
        where TTypedIdValue : EntityId
    {
        public EntityIdValueConverter(ConverterMappingHints mappingHints = null) 
            : base(id => id.Value, value => Create(value), mappingHints)
        {
        }

        private static TTypedIdValue Create(String id) => Activator.CreateInstance(typeof(TTypedIdValue), id) as TTypedIdValue;
    }
}