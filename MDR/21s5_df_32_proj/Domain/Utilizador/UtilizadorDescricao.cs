using System;
using _21s5_df_32_proj.Domain.Shared;


namespace _21s5_df_32_proj.Domain.Utilizadores

{

    public class UtilizadorDescricao: IValueObject
    {

        public const int LENGTH=100;
        public string MyDescricao { get; private set; }

        private UtilizadorDescricao(){
            
        }
        public UtilizadorDescricao(string descricao){
            
            if(descricao.Length<=LENGTH){
                
            this.MyDescricao=descricao;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do Descricao do Utilizador ultrapassado. Tamanho máximo ="+LENGTH);
            }

        }




    }

}