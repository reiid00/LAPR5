using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Pedidos

{


    public class PedidoIntroducao
    {
        public string DescricaoIntroducao { get; private set; }
        public string UserAutenticado { get; private set; } 

        public string UserIntermedio { get; private set; } 
        public string UserObjetivo { get; private set; } 
        public bool AceiteIntermedio { get; private set; }

        public bool AceiteFinal  {get; private set;}

        private int LENGTH = 2000;

        public PedidoIntroducao(string descricaoIntroducao, string userAutenticado, string userObjetivo, string userIntermedio, bool aceiteUserIntermedio, bool aceiteUserObjetivo)
        {
            this.UserAutenticado = userAutenticado;
            if(descricaoIntroducao.Length<=LENGTH){
             
            this.DescricaoIntroducao = descricaoIntroducao;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo de descrição para de Introdução. Tamanho máximo ="+LENGTH);
            }
            this.UserObjetivo = userObjetivo;
            this.UserIntermedio=userIntermedio;
            this.AceiteIntermedio = aceiteUserIntermedio;
            this.AceiteFinal = aceiteUserObjetivo;
        }
        
        private PedidoIntroducao()
        {
            
        }

        public void AceitarPedidoIntermedio()
        {
            this.AceiteIntermedio = true;
        }

        public void AceitarPedidoFinal()
        {
            if(this.AceiteIntermedio.Equals(true)){
            this.AceiteFinal = true;
            }
        }

        public bool ReturnAceiteIntermedio()
        {
            return this.AceiteIntermedio;
        }

          public bool ReturnAceiteFinal()
        {
            return this.AceiteFinal;
        }

        public string ReturnUserIntermedio()
        {
            return this.UserIntermedio;
        }

         public string ReturnUserObjetivo()
        {
            return this.UserObjetivo;
        }

    }

}
