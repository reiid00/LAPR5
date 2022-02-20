using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;
using System.Text.RegularExpressions;

namespace _21s5_df_32_proj.Domain.Tags
{
    public class TagTitulo: IValueObject
    {

        private const int MAX_LENGTH=255;
        private const int MIN_LENGTH=1;
        public string MyTitulo{ get; private set; }


        public TagTitulo(string myTitulo){
           if(!string.IsNullOrWhiteSpace(myTitulo)){
            if(MIN_LENGTH<=myTitulo.Length && myTitulo.Length<=MAX_LENGTH){
                if(IsValidTitulo(myTitulo)){
                    this.MyTitulo=myTitulo;
                
                }else{
                    throw new BusinessRuleValidationException("O Título da Tag deve ser composto apenas por caracteres alfanuméricos!");
            }
            
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo ou mínimo do Título da Tag não ultrapassado. Tamanho máximo = 255 e Tamanho mínimo = 1");
            }
           }else{
               throw new BusinessRuleValidationException("O Título da Tag não pode ser Nulo ou Espaço!");
           }
        }

        private TagTitulo(){
            
        }

         private bool IsValidTitulo(string titulo){
             return Regex.IsMatch(titulo, @"^[a-zA-Z0-9\s,]*$"); //valida se é alfanumérico
        }


    }

}