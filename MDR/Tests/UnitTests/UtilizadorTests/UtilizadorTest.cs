using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Shared;
using System.Collections.Generic;


namespace Tests.UnitTests
{
    [TestClass]
    public class UtilizadorTest
    {
        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Nome é Invalid -- UtilizadorTest")]
        public void UtilizadorNome_Invalido()
        {
            string invalidName = new string(" x");
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador(invalidName, "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Nome é Invalid -- UtilizadorTest")]
        public void UtilizadorNome_Invalido2()
        {
            string invalidName = new string('x',51);
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador(invalidName, "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Email é Invalid -- UtilizadorTest")]
        public void UtilizadorEmail_Invalido()
        {
            string invalidEmail= new string("test.");
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", invalidEmail,  new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Email é Invalid -- UtilizadorTest")]
        public void UtilizadorEmail_Invalido2()
        {
            string invalidEmail= new string("");
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", invalidEmail,  new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Password é Invalid -- UtilizadorTest")]
        public void UtilizadorPassword_Invalido()

        {
            string invalidPasswd= new string("xxxa");
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com",  new DateTime(2000, 12, 1), 
            invalidPasswd,"Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Password é Invalid -- UtilizadorTest")]
        public void UtilizadorPassword_Invalido2()

        {
            string invalidPasswd= new string("");
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com",  new DateTime(2000, 12, 1), 
            invalidPasswd,"Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Data é Invalid -- UtilizadorTest")]
        public void UtilizadorData_Invalido()

        {
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com",  new DateTime(2015, 12, 31, 5, 10, 20), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Data é Invalid -- UtilizadorTest")]
        public void UtilizadorData_Invalido2()
        {
            DateTime dt = new DateTime(2022, 12, 1);
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com", dt, 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Data é Invalid -- UtilizadorTest")]
        public void UtilizadorData_Invalido3()
        {
            DateTime dt = new DateTime();
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com", dt, 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }


        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Descricao é Invalid -- PerfilTest")]
        public void PerfilDescricao_Invalido()

        {
            string invalidDesc= new string('x', 101);
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678",invalidDesc, "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Num Telemovel é Invalid -- PerfilTest")]
        public void PerfilNumTelemovel_Invalido()

        {
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+3519000000000", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Pais é Invalid -- PerfilTest")]
        public void PerfilPais_Invalido()

        {
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
            Utilizador p = new Utilizador("Nome", "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais Com Muitas Letras", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Cidade é Invalid -- PerfilTest")]
        public void PerfilCidade_Invalido()

        {
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
             Utilizador p = new Utilizador("Nome", "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade com Muitas Letras", "Avatar",Guid.NewGuid().ToString(),list);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Avatar é Invalid -- PerfilTest")]
        public void PerfilAvatar_Invalido()

        {
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
             Utilizador p = new Utilizador("Nome", "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade","Avatar com caminho gigante",Guid.NewGuid().ToString(),list);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "EstadoHumorId é Invalid -- PerfilTest")]
        public void EstadoHumorId_Invalido()

        {
            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);
             Utilizador p = new Utilizador("Nome", "Email@Test.com", new DateTime(2000, 12, 1), 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade","Avatar com caminho gigante",null,list);
        }


        [TestMethod]
        public void Utilizador_Valido()
        {
            DateTime dt = new DateTime(2000, 12, 1);

            string[] tags = { "csharp", "Java" };
            List<string> list = new List<string>(tags);

            Utilizador p = new Utilizador("Nome", "Email@Test.com",  dt, 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),list);

            Assert.IsNotNull(p);

        }
    }
}