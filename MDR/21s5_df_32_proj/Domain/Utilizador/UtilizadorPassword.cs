using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Text.RegularExpressions;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Utilizadores
{

    public class UtilizadorPassword: IValueObject
    {

        private const int LENGTH=12;
        public string MyUtilizadorPassword{ get; private set; }


        public UtilizadorPassword(string password){
            
            if(!string.IsNullOrEmpty(password)){
                if(IsPasswordStrong(password)){
                
                this.MyUtilizadorPassword=password;
                }else{
                throw new BusinessRuleValidationException("A Password não é forte o suficiente. Deve ter oito caracteres, pelo menos um maiúsculo.");
                 }
            }else{
                throw new BusinessRuleValidationException("A Password não pode ser nula ou vazia!");
            }
        }

        private UtilizadorPassword(){
            
        }

        /*A senha deve ter pelo menos 8 caracteres, sendo pelo menos um maiúsculo*/
        private bool IsPasswordStrong(string password){
            return Regex.IsMatch(password, @"^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$");
        }

    }

}