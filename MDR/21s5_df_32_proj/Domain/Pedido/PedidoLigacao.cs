using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Relations;
using System.Collections.Generic;

namespace _21s5_df_32_proj.Domain.Pedidos

{

    public class PedidoLigacao : IValueObject
    {
        public Relation Relacao { get;private set; }

        public string UserID1 { get; private set; }
        public string UserID2 { get; private set; }
        public int Strength { get; private set; }

        public string relacao { get;private set; }



        public PedidoLigacao(string UserID1, string UserID2, string tipoRelacao, int strength)
        {           
            this.UserID1 = UserID1;
            this.UserID2 = UserID2;
            this.Strength = strength;
            this.relacao = tipoRelacao;

        }

        private PedidoLigacao()
        {
            
        }

      public void criarRelacao()
      {
          List<string> relacoes = new List<string>();
          relacoes.Add(this.relacao);
         this.Relacao = new Relation(this.UserID1,this.UserID2,relacoes,this.Strength);


      }


    }

}


