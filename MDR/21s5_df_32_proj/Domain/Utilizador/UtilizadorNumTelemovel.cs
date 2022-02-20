using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Utilizadores

{
    public class UtilizadorNumTelemovel: IValueObject
    {

        public const int LENGTH=13;
        public string NumTelemovel { get; private set; }


        private UtilizadorNumTelemovel(){
        
        }
        public UtilizadorNumTelemovel(string NumTelemovel){
            
            if(NumTelemovel.Length<=LENGTH){
                
                this.NumTelemovel=NumTelemovel;
            
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do NumTelemovelPerfil do Utilizador ultrapassado. Tamanho máximo ="+LENGTH);
            }

        }




    }

}