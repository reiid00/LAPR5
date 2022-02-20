using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Text.RegularExpressions;

namespace _21s5_df_32_proj.Domain.Relations{
	public class RelationType: IValueObject{

		public string Value { get; private set; }

		private RelationType() { }
		
		public RelationType(string type){
			if(isValid(type)){
				this.Value = type;
			}
			else{
				throw new BusinessRuleValidationException("Tag deve ser do formato alfanumérico");
			}
		}


		//Tags devem ser alfanumericas
		private bool isValid(string tag){
			return Regex.IsMatch(tag,@"^[a-zA-Z0-9\s,]*$");
		}
	}
}
