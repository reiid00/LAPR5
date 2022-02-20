using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using System;
using System.Threading.Tasks;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Pedidos;

namespace _21s5_df_32_proj.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("http://localhost:4200")]
    public class PedidoController : ControllerBase
    {
        
         private readonly PedidoService _service;

        public PedidoController(PedidoService service)
        {
            _service = service;
        }

        // GET: api/Pedido
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }


         // GET: api/Pedido/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoDTO>> GetGetById(Guid id)
        {
            var pedido = await _service.GetByIdAsync(new PedidoID(id));

            if (pedido == null)
            {
                return NotFound();
            }

            return pedido;
        }

         // GET: api/Pedido/{idUser}/UserInter
        [HttpGet("{idUser}/UserInter")]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetAllUserIntermedio(string idUser)
        {
            return await _service.GetAllAsyncByUserInterPendente(idUser);
        }


         // GET: api/Pedido/{idUser}/UserObjetivo
        [HttpGet("{idUser}/UserObjetivo")]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetAllUserObjetivo(string idUser)
        {
            return await _service.GetAllAsyncByUserObjetivoPendente(idUser);
        }

        // POST: api/Pedido
        [HttpPost]
        public async Task<ActionResult<PedidoDTO>> Create(CreatingPedidoDTO dto)
        {
            var pedido = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = pedido.Id }, pedido);
        }

         // PUT: api/Pedido/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<PedidoDTO>> UpdateAll(Guid id, PedidoDTO dto)
        {
            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var pedido = await _service.UpdateAsync(dto);
                
                if (pedido == null)
                {
                    return NotFound();
                }
                return Ok(pedido);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

          // PUT: api/Pedido/{id}/UserInter
        [HttpPut("{id}/UserInter")]
        public async Task<ActionResult<PedidoDTO>> UpdateUserB(Guid id, PedidoDTO dto)
        {
            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var pedido = await _service.UpdateUserB(dto);
                
                if (pedido == null)
                {
                    return NotFound();
                }
                return Ok(pedido);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }


          // PUT: api/Pedido/{id}/UserObjetivo
        [HttpPut("{id}/UserObjetivo")]
        public async Task<ActionResult<PedidoDTO>> UpdateUserC(Guid id, PedidoDTO dto)
        {
            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var pedido = await _service.UpdateUserC(dto);
                
                if (pedido == null)
                {
                    return NotFound();
                }
                return Ok(pedido);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }


        


          // DELETE: api/Pedido/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<PedidoDTO>> Delete(Guid id)
        {
            try
            {
                var pedido = await _service.DeleteAsync(new PedidoID(id));

                if (pedido == null)
                {
                    return NotFound();
                }

                return Ok(pedido);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }




    }




}