using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Utilizadores

{
    public class UtilizadorCidade: IValueObject
    {

        public const int LENGTH=20;
        public string myCity { get; private set; }


        private UtilizadorCidade(){
            
        }
        public UtilizadorCidade(string myCity){
            
            if(myCity.Length<=LENGTH){
                
            this.myCity=myCity;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo de carácteres do Cidade do Utilizador ultrapassado. Tamanho máximo ="+LENGTH);
            }

        }




    }

}