using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.EstadosHumor

{
    public class Nome: IValueObject
    {

        public const int LENGTH=10;
        public string MyName { get; private set; }


        public Nome(string myName){
            
            if(myName.Length<=LENGTH){
                
                this.MyName=myName;
            
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do nome do estado de humor ultrapassado. Tamanho máximo = 10");
            }

        }

        private Nome(){
        
        }

        public string getMe(){
            return this.MyName;
        }



    }

}