using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Relations {
    public class RelationStrength: IValueObject {
        public int Value { get; private set; }

        private RelationStrength() { }

        public RelationStrength(int strength) {
            this.Value = strength;
        }

        public string toString(){
            return Value.ToString();
        }
    }

}
