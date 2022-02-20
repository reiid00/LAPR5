using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using _21s5_df_32_proj.Domain.Relations;
using _21s5_df_32_proj.Domain.Shared;
using System.Collections.Generic;
namespace Tests.UnitTests
{
    [TestClass]
     
    public class RelationTest
    {
        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException),
         "Tag é inválida -- RelationTest")]
        public void RelationIconInvalido()
        {
            List<string> tags = new List<string>();
            tags.Add("Amigo!?");
           Relation eh = 
           new Relation("eeb71e98-cd0f-4fc7-92a2-8ec9e43b2ca4","eeb71e98-cd0f-4fc7-92a2-8ec9e43b2ca4",tags,3);
        }

      [TestMethod]
        public void RelationValido()
        {
            List<string> tags = new List<string>();
            tags.Add("Amigo");
           Relation eh = 
           new Relation("eeb71e98-cd0f-4fc7-92a2-8ec9e43b2ca4","eeb71e98-cd0f-4fc7-92a2-8ec9e43b2ca4",tags,3);

           Assert.IsNotNull(eh, "Não deverá ser null.");
        }

    }
}
