using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.IntegrationTests
{
    [TestClass]
    public class UtilizadorControllerTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            DateTime dt = new DateTime(2000, 12, 1);
            string[] tags = { "csharp", "Java" };
            CreatingUtilizadorDto creatingUtilizadorDto = new CreatingUtilizadorDto("Nome", "Email@Test.com",  dt, 
            "Test12345678","Descricao", "+351901234567", "Pais", "Cidade", "Avatar",Guid.NewGuid().ToString(),tags);

            UtilizadorDto utilizadorDto = UtilizadorMapper.toDTO(creatingUtilizadorDto);
            Utilizador utilizador = UtilizadorMapper.toDomain(utilizadorDto);          
            var mockRepository = new Mock<IUtilizadorRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<Utilizador>())).Returns(Task.FromResult(utilizador));

            var mockUnit = new Mock<IUnitOfWork>();

            UtilizadorService utilizadorService = new UtilizadorService(mockUnit.Object,mockRepository.Object);
            UtilizadorController controller = new UtilizadorController(utilizadorService);

            var result = await controller.Create(creatingUtilizadorDto);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<Utilizador>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<UtilizadorDto>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mockRepository = new Mock<IUtilizadorRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<Utilizador>()));

            var mockUnit = new Mock<IUnitOfWork>();

            UtilizadorService utilizadorService = new UtilizadorService(mockUnit.Object,mockRepository.Object);
            UtilizadorController controller = new UtilizadorController(utilizadorService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<UtilizadorDto>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<IUtilizadorRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<UtilizadorID>()));

            var mockUnit = new Mock<IUnitOfWork>();

            UtilizadorService utilizadorService = new UtilizadorService(mockUnit.Object,mockRepository.Object);
            UtilizadorController controller = new UtilizadorController(utilizadorService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<UtilizadorID>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<UtilizadorDto>));
        }
    }
}