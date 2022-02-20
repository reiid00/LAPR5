using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using _21s5_df_32_proj.Domain.Tags;
using _21s5_df_32_proj.Domain.Shared;


namespace Tests.UnitTests
{
    [TestClass]
    public class TagTest
    {
        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Titulo é Invalid -- TagTest")]
        public void TagTitulo_Invalido()
        {
            Tag p = new Tag(null);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Titulo é Invalid -- TagTest")]
        public void TagTitulo_Invalido2()
        {
             Tag p = new Tag("@tag");

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Titulo é Invalid -- TagTest")]
        public void TagTitulo_Invalido3()
        {
            string invalidTitulo = new string('x',256);
            Tag p = new Tag(invalidTitulo);

        }


        [TestMethod]
        public void Tag_Valida()
        {
            Tag p = new Tag("Titulo");

            Assert.IsNotNull(p);

        }
    }
}