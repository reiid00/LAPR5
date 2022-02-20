
using System.Collections.Generic;

namespace _21s5_df_32_proj.Domain.Pedidos
{
    public class CreatingPedidoDTO
    {

		// Descricao Pedido
       public string DescricaoUserInter { get; private set; }   

        public string DescricaoUserFinal {get; private set;}
		public string EstadoPedido { get; set; }


		//PedidoIntroducao
		public string DescricaoIntroducao { get;set; }
        public string UserAutenticado { get; set; } 

        public string UserIntermedio { get; set; } 
        public string UserObjetivo { get; set; } 

		public bool AceiteUserIntermedio {get; set;}

		public bool AceiteUserObjetivo {get ; set;}

		//PedidoLigacao
		public string UserID1 { get; set; }
        public string UserID2 { get; set; }
        public string RelationType { get; set; }
        public int Strength { get; set; }

		public string TituloPedido { get; set; }


        public CreatingPedidoDTO(string descricaoUserInter,string descricaoUserFinal, string estadoPedido,string descricaoIntroducao, string userAutenticado, string userIntermedio, string userObjetivo,bool aceiteUserIntermedio, bool aceiteUserObjetivo, string userID1,string userID2, string relationType, int strength , string tituloPedido)
		{
			this.DescricaoUserInter = descricaoUserInter;
			this.DescricaoUserFinal = descricaoUserFinal;
			this.EstadoPedido = estadoPedido;
			this.DescricaoIntroducao = descricaoIntroducao;
			this.UserAutenticado = userAutenticado;
			this.UserIntermedio = userIntermedio;
			this.UserObjetivo = userObjetivo;
			this.AceiteUserIntermedio = aceiteUserIntermedio;
			this.AceiteUserObjetivo = aceiteUserObjetivo;
			this.UserID1 = userID1;
			this.UserID2 = userID2;
			this.RelationType = relationType;
			this.Strength = strength;
			this.TituloPedido = tituloPedido;
		}
    }
}