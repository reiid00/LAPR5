using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Utilizadores

{
    public class UtilizadorPais: IValueObject
    {

        public const int LENGTH=20;
        public string MyPais { get; private set; }

        private UtilizadorPais(){
        
        }
        public UtilizadorPais(string MyPais){
            
            if(MyPais.Length<=LENGTH){
                
            this.MyPais=MyPais;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do Pais do Utilizador ultrapassado. Tamanho máximo ="+LENGTH);
            }

        }




    }

}