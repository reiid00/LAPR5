using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using _21s5_df_32_proj.Domain.Pedidos;
using _21s5_df_32_proj.Domain.Shared;
namespace Tests.UnitTests
{
    [TestClass]
     
    public class PedidoTest
    {
        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Descricao User Intermédio é Inválida -- max length 10000 -- Pedido Test")]
        public void PedidoDescricaoUserInterInvalida()
        {
            string invalidDescricaoUserInter = new string('D', 11000);
           Pedido ped = 
           new Pedido(invalidDescricaoUserInter,"descUserFinal","estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"Titulo");
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Descricao User Final é Inválida -- max length 10000 -- Pedido Test")]
        public void PedidoDescricaoUserFinalInvalida()
        {
            string invalidDescricaoUserFinal = new string('D', 11000);
           Pedido ped = 
           new Pedido("descUserInter",invalidDescricaoUserFinal,"estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"Titulo");
        }

       [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Estado Pedido é Inválido -- max length 20 -- Pedido Test")]
        public void PedidoEstadoInvalido()
        {
            string invalidEstadoPedido = new string('D', 30);
           Pedido ped = 
           new Pedido("descUserInter","descUserFinal",invalidEstadoPedido,"descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"Titulo");
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Descricao Introducao é Invalida -- max length 2000 --  Pedido Test")]
        public void PedidoDescricaoIntroducaoInvalida()
        {
            string invalidDescIntro = new string('D', 3000);
           Pedido ped = 
           new Pedido("descUserInter","descUserFinal","estado",invalidDescIntro,"userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"Titulo");
        }

         [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Titulo é Invalido -- max length 50 -- Pedido Test")]
        public void PedidoTituloInvalido()
        {
            string invalidTitulo = new string('D', 55);
           Pedido ped = 
           new Pedido("descUserInter","descUserFinal","estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,invalidTitulo);
        }


        [TestMethod]
        public void TestPedidoIntroducaoUserIntermedio()
        {
            Pedido ped =  new Pedido("descUserInter","descUserFinal","estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"titulo");
            
            ped.PedidoIntroducao.AceitarPedidoIntermedio();

            Assert.AreEqual(ped.PedidoIntroducao.ReturnAceiteIntermedio(),true);
            
        }

        [TestMethod]
        public void TestPedidoIntroducaoUserFinal()
        {
                Pedido ped =  new Pedido("descUserInter","descUserFinal","estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"titulo");
            
            ped.PedidoIntroducao.AceitarPedidoIntermedio();

            ped.PedidoIntroducao.AceitarPedidoFinal();

            Assert.AreEqual(ped.PedidoIntroducao.ReturnAceiteFinal(),true);

        }



            // Neste caso fica false pois o user intermedio nao aceitou o pedido de introdução
        [TestMethod]
        public void TestPedidoIntroucaoUserFinalFalse()
        {
                
                Pedido ped =  new Pedido("descUserInter","descUserFinal","estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"titulo");
            ped.PedidoIntroducao.AceitarPedidoFinal();
            Assert.AreEqual(ped.PedidoIntroducao.ReturnAceiteFinal(),false);
        }




      [TestMethod]
        public void PedidoValido()
        {
          Pedido ped = 
           new Pedido("descUserInter","descUserFinal","estado","descIntro","userAut1","userInter1","userObj1",false,false,"userID1","userID2","amigos",1,"titulo");
      
           Assert.IsNotNull(ped, "Não deverá ser null.");
        }

    }
}
