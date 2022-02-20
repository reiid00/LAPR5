using System;
using _21s5_df_32_proj.Domain.Shared;
using Newtonsoft.Json;

namespace _21s5_df_32_proj.Domain.Pedidos
{
    public class PedidoID : EntityId
    {
        [JsonConstructor]
        public PedidoID(Guid value) : base(value)
        {
        }

        public PedidoID(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}