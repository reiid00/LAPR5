using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Tags;
using Microsoft.AspNetCore.Cors;

namespace _21s5_df_32_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("http://localhost:4200")]
    public class TagController : ControllerBase
    {
        private readonly TagService _service;

        public TagController(TagService service)
        {
            _service = service;
        }

        // GET: api/Tag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Tag/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TagDto>> GetGetById(Guid id)
        {
            var tags = await _service.GetByIdAsync(new TagID(id));

            if (tags == null)
            {
                return NotFound();
            }

            return tags;
        }

        // GET: api/Tag/byTitulo?titulo=titulo&password=password
        [HttpGet("t/{titulo}")]
        public async Task<ActionResult<TagDto>> GetByTitulo( string titulo)
        {
            var tags = await _service.GetByTituloAsync(new TagTitulo(titulo));

            if (tags == null)
            {
                return NotFound();
            }
            return tags;
        }

        // POST: api/Tag
        [HttpPost]
        public async Task<ActionResult<TagDto>> Create(CreatingTagDto obj)
        {
            var dto = TagMapper.toDTO(obj);
            var tags = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = tags.Id }, tags);
        }

        
        // PUT: api/Tag/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TagDto>> Update(Guid id, TagDto dto)
        {
            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var tags = await _service.UpdateAsync(dto);
                
                if (tags == null)
                {
                    return NotFound();
                }
                return Ok(tags);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Tag/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TagDto>> SoftDelete(Guid id)
        {
            var tags = await _service.InactivateAsync(new TagID(id));

            if (tags == null)
            {
                return NotFound();
            }

            return Ok(tags);
        }
        
        // DELETE: api/Tag/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<TagDto>> HardDelete(Guid id)
        {
            try
            {
                var tags = await _service.DeleteAsync(new TagID(id));

                if (tags == null)
                {
                    return NotFound();
                }

                return Ok(tags);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}