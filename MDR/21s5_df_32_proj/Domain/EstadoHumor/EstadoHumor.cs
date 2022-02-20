using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.EstadosHumor

{

    public class EstadoHumor: Entity<EstadoHumorID>
    {

        public Nome Nome {get; private set;}

        public Icon Icon {get; private set;}

        public DescricaoEstadoHumor DescricaoEstadoHumor {get; private set;}


        private EstadoHumor(){
        
        }
        public EstadoHumor(string nome, string icon, string descricao){
            
            this.Id=new EstadoHumorID(Guid.NewGuid());
            this.Nome=new Nome(nome);
            this.Icon=new Icon(icon);
            this.DescricaoEstadoHumor=new DescricaoEstadoHumor(descricao);

        }


        public void ChangeNome(string nome){

            this.Nome=new Nome(nome);

        }

        public void ChangeIcon(string icon){
            this.Icon=new Icon(icon);
        }

        public void ChangeDescricao(string descricao){
            this.DescricaoEstadoHumor=new DescricaoEstadoHumor(descricao);

        }

      

        




    }




}