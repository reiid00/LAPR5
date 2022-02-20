using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Collections.Generic;


namespace _21s5_df_32_proj.Domain.Pedidos

{


	public class Pedido: Entity<PedidoID> , IAggregateRoot
	{
		public DescricaoPedido DescricaoPedido { get; private set; }
		public EstadoPedido EstadoPedido { get; private set; }
		public PedidoIntroducao PedidoIntroducao { get; private set; }
		public PedidoLigacao PedidoLigacao { get; private set; }
		public TituloPedido TituloPedido { get; private set; }

		public Pedido(string descricaoUserInter,string descricaoUserFinal, string estadoPedido,string descricaoIntroducao, string userAutenticado, string userIntermedio, string userObjetivo,bool aceiteUserIntermedio, bool aceiteUserObjetivo, string userID1,string userID2, string relationType, int strength , string tituloPedido)
		{
			 this.Id=new PedidoID(Guid.NewGuid());
			this.PedidoLigacao = new PedidoLigacao(userID1,userID2,relationType,strength);
			this.EstadoPedido = new EstadoPedido(estadoPedido);
			this.TituloPedido = new TituloPedido(tituloPedido);
			this.DescricaoPedido = new DescricaoPedido(descricaoUserInter,descricaoUserFinal);
			this.PedidoIntroducao = new PedidoIntroducao(descricaoIntroducao,userAutenticado,userObjetivo,userIntermedio,aceiteUserIntermedio,aceiteUserObjetivo);
		}

		private Pedido()
		{
			
		}

		public void ChangeDescricaoPedido(string descricaoUserInter,string descricaoUserFinal){

            this.DescricaoPedido=new DescricaoPedido(descricaoUserInter,descricaoUserFinal);

        }

		public void ChangeEstadoPedido(string estadoPedido){

            this.EstadoPedido = new EstadoPedido(estadoPedido);;

        }

		public void ChangePedidoIntroducao(string descricaoIntroducao, string userAutenticado, string userObjetivo, string userIntermedio,bool aceiteUserIntermedio,bool aceiteUserObjetivo){

			this.PedidoIntroducao = new PedidoIntroducao(descricaoIntroducao,userAutenticado,userObjetivo,userIntermedio,aceiteUserIntermedio,aceiteUserObjetivo);

		}

		public void ChangePedidoLigacao(string userID1, string userID2, string relationType, int strength){

			this.PedidoLigacao = new PedidoLigacao(userID1,userID2,relationType,strength);

		}

		public void ChangeTituloPedido(string tituloPedido){

			this.TituloPedido = new TituloPedido(tituloPedido);;

		}

		public PedidoLigacao returnPedidoLigacao()
		{
			return this.PedidoLigacao;
		}



	}

}
