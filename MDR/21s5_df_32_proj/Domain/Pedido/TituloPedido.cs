using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Pedidos

{


    public class TituloPedido: IValueObject
    {
        public string TtlPedido { get; private set; }
        
        private int LENGTH = 50;

        public TituloPedido(string tituloPedido)
        {
            if(tituloPedido.Length<=LENGTH){
             
            this.TtlPedido = tituloPedido;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo do titulo de pedido ultrapassado. Tamanho máximo ="+LENGTH);
            }
        }

        private TituloPedido()
        {
            
        }
    }

}
