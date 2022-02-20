using System;
using _21s5_df_32_proj.Domain.Shared;
using Newtonsoft.Json;
using _21s5_df_32_proj.Domain.Tags; 

namespace _21s5_df_32_proj.Domain.Tags
{
    public class TagUtilizadorID : EntityId
    {
        [JsonConstructor]
        public TagUtilizadorID(Guid value) : base(value)
        {
        }

        public TagUtilizadorID(String value) : base(value)
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