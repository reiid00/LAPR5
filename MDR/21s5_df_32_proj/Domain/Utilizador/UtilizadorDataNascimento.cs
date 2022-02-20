using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Utilizadores

{

    public class UtilizadorDataNascimento: IValueObject
    {

        private const int MIN=16;
        public DateTime MyUtilizadorDataNascimento{ get; private set; }


        public UtilizadorDataNascimento(DateTime dataNascimento){

            if(dataNascimento==default(DateTime)){
                throw new BusinessRuleValidationException("Data Inválida! A data não pode ser nula.");
            }

            if((DateTime.Now.Year-dataNascimento.Year)<0){            
                throw new BusinessRuleValidationException("Data Inválida! O ano inserido não existe.");
            }
            
            /* primeiro subtrai a data atual da de nascimento e tira um, se o mês atual for anterior ao de nascimento ou 
            for o mesmo mês e o dia atual é maior ou igual ao de nascimento, somamos o valor 1 novamente, se não for
            somamos 0 e comparamos com o valor mínimo para aceder ao sistema*/
            if(((DateTime.Now.Year-dataNascimento.Year-1)+
            (((DateTime.Now.Month > dataNascimento.Month) ||
            ((DateTime.Now.Month == dataNascimento.Month) && 
            (DateTime.Now.Day >= dataNascimento.Day))) ? 1 : 0))>=MIN){
                
            this.MyUtilizadorDataNascimento=dataNascimento;
            }else{
                throw new BusinessRuleValidationException("Data inválida! Idade mínima do Utilizador não atingida. Idade Mínima = 16 anos.");
            }  
            
        }

        private UtilizadorDataNascimento(){
            
        }

    }

}