using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using _21s5_df_32_proj.Domain.EstadosHumor;
using _21s5_df_32_proj.Domain.Shared;
namespace Tests.UnitTests
{
    [TestClass]
     
    public class EstadoHumorTest
    {
        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Descricao é Invalida -- EstadoHumorTest")]
        public void EstadoHumorDescricaoInvalida()
        {
           EstadoHumor eh = 
           new EstadoHumor("Triste", "Icon","Descricao é Invalida -- EstadoHumorTest");
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Nome é Invalido -- EstadoHumorTest")]
        public void EstadoHumorNomeInvalido()
        {
           EstadoHumor eh = 
           new EstadoHumor("Este Nome Vai Falhar", "Icon","Descricao");
        }


        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Icon é Invalido -- EstadoHumorTest")]
        public void EstadoHumorIconInvalido()
        {
           EstadoHumor eh = 
           new EstadoHumor("Triste", "Ainda só testa o length","Descricao");
        }

      [TestMethod]
        public void EstadoHumorValido()
        {
           EstadoHumor eh = 
           new EstadoHumor("Triste", "caminho","Tristeza");

           Assert.IsNotNull(eh, "Não deverá ser null.");
        }

    }
}
