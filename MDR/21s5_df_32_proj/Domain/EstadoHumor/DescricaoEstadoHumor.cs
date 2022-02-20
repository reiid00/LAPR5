using System;
using _21s5_df_32_proj.Domain.Shared;


namespace _21s5_df_32_proj.Domain.EstadosHumor

{

    public class DescricaoEstadoHumor: IValueObject
    {

        public const int LENGTH=10;
        public string MyDescricao{ get; private set; }


        public DescricaoEstadoHumor(string descricao){
            
            if(descricao.Length<=LENGTH){
                
            this.MyDescricao=descricao;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do Descricao do estado de humor ultrapassado. Tamanho máximo = 10");
            }

        }

        private DescricaoEstadoHumor(){
        
        }        

        public string getMe(){
            return this.MyDescricao;
        }


    }

}