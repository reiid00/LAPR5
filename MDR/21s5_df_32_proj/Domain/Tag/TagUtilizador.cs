using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Text.RegularExpressions;
using _21s5_df_32_proj.Domain.Tags;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Controllers;

namespace _21s5_df_32_proj.Domain.Tags
{

    public class TagUtilizador: Entity<TagUtilizadorID> , IAggregateRoot
    {

        public TagID TagId {get; private set;}

        public Tag Tag {get; private set;}

         public UtilizadorID UtilizadorId {get; private set;}

        public Utilizador Utilizador {get; private set;}

        public TagUtilizador(string tag,UtilizadorID id){
            
            this.Id=new TagUtilizadorID(Guid.NewGuid());
            this.Tag=new Tag(tag);
            this.TagId=Tag.Id;
            this.UtilizadorId=id;
        }

        public TagUtilizador(){


        }
      
    }

}