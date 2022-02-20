using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;
using Microsoft.AspNetCore.Cors;

namespace _21s5_df_32_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("http://localhost:4200")]
    public class UtilizadorController : ControllerBase
    {
        private readonly UtilizadorService _service;

        public UtilizadorController(UtilizadorService service)
        {
            _service = service;
        }

        // GET: api/Utilizador
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UtilizadorDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Utilizador/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UtilizadorDto>> GetGetById(Guid id)
        {
            var utilizador = await _service.GetByIdAsync(new UtilizadorID(id));

            if (utilizador == null)
            {
                return NotFound();
            }

            return utilizador;
        }

        // GET: api/Utilizador/byEmail?email=email&password=password
        [HttpGet("{email}/{password}")]
        public async Task<ActionResult<UtilizadorDto>> GetByEmail( string email, string password)
        {
            var utilizador = await _service.GetByEmailAsync(new UtilizadorEmail(email));

            if (utilizador == null)
            {
                return NotFound();
            }

            if(!utilizador.Password.Equals(password)){
                return NotFound();
            }

            return utilizador;
        }

        // POST: api/Utilizador
        [HttpPost]
        public async Task<ActionResult<UtilizadorDto>> Create(CreatingUtilizadorDto obj)
        {
            var dto = UtilizadorMapper.toDTO(obj);
            var utilizador = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = utilizador.Id }, utilizador);
        }

        
        // PUT: api/Utilizador/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UtilizadorDto>> Update(Guid id, UtilizadorDto dto)
        {
            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var utilizador = await _service.UpdateAsync(dto);
                
                if (utilizador == null)
                {
                    return NotFound();
                }
                return Ok(utilizador);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Utilizador/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UtilizadorDto>> SoftDelete(Guid id)
        {
            var utilizador = await _service.InactivateAsync(new UtilizadorID(id));

            if (utilizador == null)
            {
                return NotFound();
            }

            return Ok(utilizador);
        }
        
        // DELETE: api/Utilizador/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<UtilizadorDto>> HardDelete(Guid id)
        {
            try
            {
                var utilizador = await _service.DeleteAsync(new UtilizadorID(id));

                if (utilizador == null)
                {
                    return NotFound();
                }

                return Ok(utilizador);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}