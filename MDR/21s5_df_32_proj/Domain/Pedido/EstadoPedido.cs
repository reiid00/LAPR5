using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Pedidos

{


    public class EstadoPedido: IValueObject
    {
        public string Estado { get; private set; }

        private int LENGTH = 20;
        public EstadoPedido(string estado)
        {
           if(estado.Length<=LENGTH){
             
            this.Estado = estado;
            }else{
                throw new BusinessRuleValidationException("Tamanho máximo de estado do pedido. Tamanho máximo ="+LENGTH);
            }
        }

        private EstadoPedido(){

        }
    }

}
