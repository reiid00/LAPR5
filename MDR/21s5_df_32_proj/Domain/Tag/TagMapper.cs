using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Domain.Tags
{
    public class TagMapper
    {
        public static TagDto toDTO(CreatingTagDto obj)
        {

            return new TagDto(obj.Titulo);
        }

        public static TagDto toDTO(Tag obj)
        {

            return new TagDto(obj.Id.AsString(), obj.Titulo.MyTitulo);
        }

        public static Tag toDomain(TagDto dto)
        {
            return new Tag(dto.Titulo);
        }
       
}
}