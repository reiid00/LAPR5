using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Tags;


namespace _21s5_df_32_proj.Domain.Tags
{
    public class TagDto
    {

        public string Id {get; set;}

        public string Titulo {get; set;}

        public TagDto(string titulo)
        {
            this.Titulo = titulo;
        }

        public TagDto(string id,string titulo)
        {
            this.Id=id;
            this.Titulo=titulo;
        }
    }
}