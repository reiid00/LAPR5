using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Utilizadores
{
    public class UtilizadorNome: IValueObject
    {

        private const int LENGTH=50;
        public string MyName{ get; private set; }


        public UtilizadorNome(string myName){
            
            if(myName.Length<=LENGTH){
                if(!string.IsNullOrEmpty(myName) && (myName[0] == ' ' || myName[0] == '\t')){
                    throw new BusinessRuleValidationException("Se o nome for especificado não pode começar com espaço.");
                }else{
                    this.MyName=myName;
            }
            
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do UtilizadorNome do Utilizador ultrapassado. Tamanho máximo = 50");
            }

        }

        private UtilizadorNome(){
            
        }

    }

}