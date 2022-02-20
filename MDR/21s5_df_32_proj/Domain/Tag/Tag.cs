using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Text.RegularExpressions;
using _21s5_df_32_proj.Domain.Tags;
using _21s5_df_32_proj.Domain.Utilizadores;
using System.Collections.Generic;

namespace _21s5_df_32_proj.Domain.Tags
{

    public class Tag : Entity<TagID> , IAggregateRoot
    {

        public TagTitulo Titulo {get; private set;}

        public IList<TagUtilizador> TagUtilizadores {get; private set;}

        public bool Active{ get;  private set; }


        public Tag(string titulo){
            
            this.Id=new TagID(Guid.NewGuid());

            this.Titulo=new TagTitulo(titulo);
                
            this.Active = true;

        }
        
       

        private Tag(){
            this.Active = true;
        }

        public void ChangeTitulo(string titulo){

            this.Titulo=new TagTitulo(titulo);

        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public override string ToString(){
            return "Tag: " + Id + ", Titulo: " + Titulo;
        }

    }

}