using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Utilizadores
{
    public class UtilizadorAvatar: IValueObject
    {

        public const int LENGTH=10;
        public string myAvatar { get; private set; } 


        private UtilizadorAvatar(){
            
        }
        public UtilizadorAvatar(string myAvatar){
            
            if(myAvatar.Length<=LENGTH){
                
            this.myAvatar=myAvatar;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do Avatar do Utilizador ultrapassado. Tamanho máximo = 10");
            }

        }




    }

}