using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Relations;


namespace _21s5_df_32_proj.Domain.Relations
{
    public class RelationMapper
    {
    
        public static RelationDto toDTO(Relation rel)
        {
            return new RelationDto(rel);
        }

        public static Relation toDomain(RelationDto dto)
        {
            return new Relation(dto.UserID1,dto.UserID2,dto.RelationTypes,dto.Strength);
        }

         public static Relation toDomain(CreatingRelationDto dto)
        {
            return new Relation(dto.UserID1,dto.UserID2,dto.RelationTypes,dto.Strength);
        }
       
}
}