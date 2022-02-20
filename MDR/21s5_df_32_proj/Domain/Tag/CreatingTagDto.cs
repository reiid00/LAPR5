using System;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Domain.Tags
{
    public class CreatingTagDto
    {

       public string Titulo {get; set;}
        public CreatingTagDto(string titulo)
        {
            this.Titulo = titulo;
        }
    }
}