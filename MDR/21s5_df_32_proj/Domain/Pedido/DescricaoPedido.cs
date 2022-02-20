using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Pedidos

{


    public class DescricaoPedido: IValueObject
    {
        public string DescricaoUserInter { get; private set; }   

        public string DescricaoUserFinal {get; private set;}

        private int LENGTH = 10000;
        public DescricaoPedido(string descricaoUserInter, string descricaoUserFinal)
        {
           if(descricaoUserInter.Length<=LENGTH){
             
            this.DescricaoUserInter = descricaoUserInter;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo de descrição para user Intermédio ultrapassado. Tamanho máximo ="+LENGTH);
            }

             if(descricaoUserFinal.Length<=LENGTH){
             
            this.DescricaoUserFinal = descricaoUserFinal;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo de descrição para user Intermédio final. Tamanho máximo ="+LENGTH);
            }
        }

        private DescricaoPedido()
        {}
    }

}
