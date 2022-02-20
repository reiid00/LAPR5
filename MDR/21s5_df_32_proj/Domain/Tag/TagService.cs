using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Tags;


namespace _21s5_df_32_proj.Domain.Tags{

    public class TagService{

        private readonly IUnitOfWork _unitOfWork;
        private readonly ITagRepository _repo;


        public TagService(IUnitOfWork unitOfWork, ITagRepository repo){

            this._unitOfWork=unitOfWork;
            this._repo=repo;

        }

        public async Task<List<TagDto>> GetAllAsync(){
        
            var list = await this._repo.GetAllAsync();

            List<TagDto> listDto = list.ConvertAll<TagDto>(

                tag => TagMapper.toDTO(tag));
        
            return listDto;

        }

        

        public async Task<TagDto> GetByIdAsync(TagID id){

            var tag=await this._repo.GetByIdAsync(id);

            return (tag==null ? null: TagMapper.toDTO(tag));
            
        }

        public async Task<TagDto> GetByTituloAsync(TagTitulo titulo){

            var list = await this._repo.GetAllAsync();

            for ( int i = 0; i < list.Count; i++){
                if(list[i].Titulo.MyTitulo.Equals(titulo.MyTitulo))
                    return TagMapper.toDTO(list[i]);
            }
            return null;
        }

        public async Task<TagDto> AddAsync(TagDto dto){

            var tag = TagMapper.toDomain(dto);

            await this._repo.AddAsync(tag);

            await this._unitOfWork.CommitAsync();

            return TagMapper.toDTO(tag);
        }

        public async Task<TagDto> UpdateAsync(TagDto dto)
        {
            var tag = await this._repo.GetByIdAsync(new TagID(dto.Id)); 

            if (tag == null)
                return null;   


            tag.ChangeTitulo(dto.Titulo);

            await this._unitOfWork.CommitAsync();

            return TagMapper.toDTO(tag);
        }


         public async Task<TagDto> InactivateAsync(TagID id)
        {
            var tag = await this._repo.GetByIdAsync(id); 

            if (tag == null)
                return null;   

            tag.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return TagMapper.toDTO(tag);
        }

        
       public async Task<TagDto> DeleteAsync(TagID id)
        {
            var tag = await this._repo.GetByIdAsync(id); 

            if (tag == null)
                return null;   

            if (tag.Active)
                throw new BusinessRuleValidationException("Não é possível apagar um Tag activo.");
            

            this._repo.Remove(tag);
            await this._unitOfWork.CommitAsync();

            return TagMapper.toDTO(tag);
        }

    }



}