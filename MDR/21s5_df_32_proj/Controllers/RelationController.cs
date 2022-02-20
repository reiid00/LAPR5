using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using System;
using System.Threading.Tasks;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Relations;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("http://localhost:4200")]
    public class RelationController : ControllerBase
    {
        private readonly RelationService _service;

        private readonly UtilizadorService _user_service;


        public RelationController(RelationService service)
        {
            _service = service;
        }

        // GET: api/Relation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RelationDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Relation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RelationDto>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new RelationID(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        [HttpGet("netByPerspective/{id}")]
        public async Task<ActionResult<IEnumerable<RelationDto>>> GetNetByPerspective(Guid id)
        {
            Console.Write("MY ID"+id);
            var response = await _service.GetNetByPerspective(new UtilizadorID(id));

            if (response == null)
            {
                return NotFound();
            }

            return response;
        }

        

        [HttpGet("friends/{id}")]
        public async Task<ActionResult<IEnumerable<RelationDto>>> getFriends(string id)
        {
            var cat = await _service.GetFriends(id);

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        [HttpGet("leaderboardFortaleza")]
        public async Task<ActionResult<IEnumerable<string>>> getLeaderBoardsFortaleza()
        {
            var cat = await _service.getLeaderBoardsFortaleza();

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        
        [HttpGet("strength/{id}")]
        public async Task<ActionResult<int>> getStrengthByUser(string id)
        {
            var cat = await _service.getStrengthByUser(id);

            return cat;
        }

         [HttpGet("strengthTotal/{id}/{id2}")]
        public async Task<ActionResult<int>> getStrengthTotal(string id,string id2)
        {
            var cat = await _service.getStrengthTotal(id,id2);

            return cat;
        }

          [HttpGet("tamanhoRede/{n}/{id}")]
        public async Task<ActionResult<int>>   getTamanhoRede(string id,int n)
        {
            var cat = await _service.getTamanhoRede(id,n);

            return cat;
        }

      

        

        [HttpGet("newfriends/{id}/{id2}")]
        public async Task<ActionResult<IEnumerable<RelationDto>>> getNewFriends(string id,string id2)
        {
            Console.Write(id2);
            Console.Write("here");
            var cat = await _service.GetNewFriends(id,id2);

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Relation
        [HttpPost]
        public async Task<ActionResult<RelationDto>> Create(CreatingRelationDto cDto)
        {
            var dto = new RelationDto(cDto);
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        [HttpPost("reverseRelationsFromList")]
        public async Task<ActionResult<IEnumerable<RelationDto>>> getReverseRelationsFromList(List<RelationDto> listToReverse){
            
            var response = await _service.GetReverseRelationsFromList(listToReverse);

            if (response == null)
            {
                return NotFound();
            }

            return response;
        }

        
        // PUT: api/Relation/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RelationDto>> Update(Guid id, RelationDto Dto)
        {
            if (id.ToString() != Dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _service.UpdateAsync(Dto);
                
                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // DELETE: api/Relation/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<RelationDto>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new RelationID(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}