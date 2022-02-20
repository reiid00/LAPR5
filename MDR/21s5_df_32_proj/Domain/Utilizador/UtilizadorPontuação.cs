using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Utilizadores
{

    public class UtilizadorPontuacao: IValueObject
    {
        public int MyUtilizadorPontuacao{ get; private set; }


        public UtilizadorPontuacao(int pontuacao){
            
            this.MyUtilizadorPontuacao=pontuacao;
           
        }
        public UtilizadorPontuacao(){
            
            this.MyUtilizadorPontuacao=0;
           
        }

    }

}