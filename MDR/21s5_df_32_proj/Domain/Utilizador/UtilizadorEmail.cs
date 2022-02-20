using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Utilizadores
{
    public class UtilizadorEmail: IValueObject
    {

        public const int LENGTH=50;
        public string MyUtilizadorEmail{ get; private set; }


        public UtilizadorEmail(string myUtilizadorEmail){
            
            if(string.IsNullOrEmpty(myUtilizadorEmail)){
                throw new BusinessRuleValidationException("Email não é válido. Email não pode ser nulo");
            }

            if(IsValidEmail(myUtilizadorEmail)){
                
            this.MyUtilizadorEmail=myUtilizadorEmail;
            }else{
                throw new BusinessRuleValidationException("Email não é válido. Deve ser do tipo exemplo@email.exemplo");
            }

        }

        private UtilizadorEmail(){
            
        }


        public bool IsValidEmail(string email){
            if (email.Trim().EndsWith(".")) {
                return false; //se terminar em "." retorna logo falso
            }
            try {
              var addr = new System.Net.Mail.MailAddress(email);
              return addr.Address == email; //se a comparação der certo então é valido
            }
            catch {
             return false;//retorna falso se não der certo a transformação da string em endereço de email
             }
        }



    }

}