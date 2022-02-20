using System;
using System.Collections.Generic;


namespace _21s5_df_32_proj.Domain.Pedidos
{
    public class PedidoDTO
    {
          public string Id { get; set; }
          
    // Descricao Pedido
       public string DescricaoUserInter { get; set; }   

        public string DescricaoUserFinal {get; set;}
		public string EstadoPedido { get; set; }


		//PedidoIntroducao
		public string DescricaoIntroducao { get; set; }
        public string UserAutenticado { get; set; } 

        public string UserIntermedio { get; set; } 
        public string UserObjetivo { get; set; } 

        public bool AceiteUserIntermedio {get;set;}

        public bool AceiteUserObjetivo{get;set;}

		//PedidoLigacao
		public string UserID1 { get; set; }
        public string UserID2 { get; set; }
        public string RelationType { get; set; }
        public int Strength { get; set; }

		public string TituloPedido { get; set; }

          public PedidoDTO(Pedido ped){
            this.Id=ped.Id.AsString();
            this.DescricaoUserInter = ped.DescricaoPedido.DescricaoUserInter;
            this.DescricaoUserFinal = ped.DescricaoPedido.DescricaoUserFinal;
            this.EstadoPedido = ped.EstadoPedido.Estado;
            this.DescricaoIntroducao = ped.PedidoIntroducao.DescricaoIntroducao;
            this.UserAutenticado = ped.PedidoIntroducao.UserAutenticado;
            this.UserIntermedio = ped.PedidoIntroducao.UserIntermedio;
            this.UserObjetivo = ped.PedidoIntroducao.UserObjetivo;
            this.AceiteUserIntermedio = ped.PedidoIntroducao.AceiteIntermedio;
            this.AceiteUserObjetivo = ped.PedidoIntroducao.AceiteFinal;
            this.UserID1 = ped.PedidoLigacao.UserID1;
            this.UserID2 = ped.PedidoLigacao.UserID2;
            this.RelationType = ped.PedidoLigacao.relacao;
            this.Strength = ped.PedidoLigacao.Strength;
            this.TituloPedido = ped.TituloPedido.TtlPedido;

        }

        public PedidoDTO(string descricaoUserInter,string descricaoUserFinal, string estadoPedido, string descricaoIntroducao, string userAutenticado, string userIntermedio, string userObjetivo,bool aceiteUserIntermedio,bool aceiteUserObjetivo, string userID1, string userID2, string relationType, int strength, string tituloPedido)
        {
            this.DescricaoUserInter = descricaoUserInter;
            this.DescricaoUserFinal = descricaoUserFinal;
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

        public PedidoDTO(){
            
        }
    }
}