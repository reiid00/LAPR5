using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using _21s5_df_32_proj.Domain.EstadosHumor;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


namespace Tests.UnitTests
{
    [TestClass]
    public class ControllerEstadoHumorTest
    {
    
        [TestMethod]
        public async Task Post_NormalParameters_Sucess(){
            
            CreatingEstadoHumorDTO cDTO = new CreatingEstadoHumorDTO("Feliz","HappyIcon","Felizardo");

            EstadoHumor eh = EstadoHumorMapper.toDomain(cDTO);          
            var mockRepository = new Mock<IEstadoHumorRepository>();
            mockRepository.Setup(repository => repository.AddAsync(It.IsAny<EstadoHumor>())).Returns(Task.FromResult(eh));

            var mockUnit = new Mock<IUnitOfWork>();

            EstadoHumorService ehService = new EstadoHumorService(mockUnit.Object,mockRepository.Object);
            EstadosHumorController controller = new EstadosHumorController(ehService);

            var result = await controller.Create(cDTO);

            mockRepository.Verify(repository => repository.AddAsync(It.IsAny<EstadoHumor>()), Times.AtLeastOnce());
            mockUnit.Verify(unit => unit.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<EstadoHumorDTO>));
        }

        [TestMethod]
        public async Task GetAll_Sucess(){
            var mockRepository = new Mock<IEstadoHumorRepository>();
            mockRepository.Setup(repository => repository.GetAllAsync()).Returns(Task.FromResult(new List<EstadoHumor>()));

            var mockUnit = new Mock<IUnitOfWork>();

            EstadoHumorService ehService = new EstadoHumorService(mockUnit.Object,mockRepository.Object);
            EstadosHumorController controller = new EstadosHumorController(ehService);

            var result = await controller.GetAll();

            mockRepository.Verify(repository => repository.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<IEnumerable<EstadoHumorDTO>>));
        }

        [TestMethod]
        public async Task GetById_NormalId_Sucess(){
            Guid id = new Guid();

            var mockRepository = new Mock<IEstadoHumorRepository>();
            mockRepository.Setup(repository => repository.GetByIdAsync(It.IsAny<EstadoHumorID>()));

            var mockUnit = new Mock<IUnitOfWork>();

            EstadoHumorService ehService = new EstadoHumorService(mockUnit.Object,mockRepository.Object);
            EstadosHumorController controller = new EstadosHumorController(ehService);

            var result = await controller.GetGetById(id);

            mockRepository.Verify(repository => repository.GetByIdAsync(It.IsAny<EstadoHumorID>()), Times.AtLeastOnce());
            Assert.IsInstanceOfType(result, typeof(ActionResult<EstadoHumorDTO>));
        }
    }
}