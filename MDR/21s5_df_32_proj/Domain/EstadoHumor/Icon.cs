using System;
using _21s5_df_32_proj.Domain.Shared;


namespace _21s5_df_32_proj.Domain.EstadosHumor

{
public class Icon: IValueObject
    {

        public const int LENGTH=10;
        private const string PATH_TO_ICON="./Icons/";
        public string MyIcon { get; private set; }

        public Icon(string myIcon){
            
            if(myIcon.Length<=LENGTH){
                
                this.MyIcon=PATH_TO_ICON+myIcon;
            
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do myIcon do estado de humor ultrapassado. Tamanho máximo = 10");
            }

        }

        private Icon(){
        
        }
    
         public string getMe(){
            return this.MyIcon;
        }
    }

}