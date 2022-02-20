using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Pedidos{
	public class TiposRelacao: IValueObject {

		public string Value { get; private set; }

		private TiposRelacao() { }
		
		public TiposRelacao(string type){
			this.Value = type;
		}
	}
}
