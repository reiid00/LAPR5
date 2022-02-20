using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using System;
using System.Threading.Tasks;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.EstadosHumor;

namespace _21s5_df_32_proj.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("http://localhost:4200")]
    public class EstadosHumorController : ControllerBase
    {
        private readonly EstadoHumorService _service;

        public EstadosHumorController(EstadoHumorService service)
        {
            _service = service;
        }

        // GET: api/EstadosHumor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoHumorDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/EstadosHumor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoHumorDTO>> GetGetById(Guid id)
        {
            var eh = await _service.GetByIdAsync(new EstadoHumorID(id));

            if (eh == null)
            {
                return NotFound();
            }

            return eh;
        }

        // POST: api/EstadosHumor
        [HttpPost]
        public async Task<ActionResult<EstadoHumorDTO>> Create(CreatingEstadoHumorDTO dto)
        {
            var eh = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = eh.Id }, eh);
        }

        
        // PUT: api/EstadosHumor/5
        [HttpPut("{id}")]
        public async Task<ActionResult<EstadoHumorDTO>> Update(Guid id, EstadoHumorDTO dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var eh = await _service.UpdateAsync(id, dto);
                
                if (eh == null)
                {
                    return NotFound();
                }
                return Ok(eh);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // DELETE: api/EstadosHumor/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<EstadoHumorDTO>> HardDelete(Guid id)
        {
            try
            {
                var eh = await _service.DeleteAsync(new EstadoHumorID(id));

                if (eh == null)
                {
                    return NotFound();
                }

                return Ok(eh);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}