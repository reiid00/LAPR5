using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.EstadosHumor{

    public class EstadoHumorService{

        private readonly IUnitOfWork _unitOfWork;
        private readonly IEstadoHumorRepository _repo;


        public EstadoHumorService(IUnitOfWork unitOfWork, IEstadoHumorRepository repo){

            this._unitOfWork=unitOfWork;
            this._repo=repo;

        }

        public async Task<List<EstadoHumorDTO>> GetAllAsync(){
        
            var list = await this._repo.GetAllAsync();

            List<EstadoHumorDTO> listDTO = list.ConvertAll<EstadoHumorDTO>(

                estadoHumor => EstadoHumorMapper.toDTO(estadoHumor)
            );
        
            return listDTO;

        }

        public async Task<EstadoHumorDTO> GetByIdAsync(EstadoHumorID id){

            var estadoHumor=await this._repo.GetByIdAsync(id);

            return (estadoHumor==null ? null: EstadoHumorMapper.toDTO(estadoHumor));
        
        }

        public async Task<EstadoHumorDTO> AddAsync(CreatingEstadoHumorDTO dto){

            var estadoHumor = EstadoHumorMapper.toDomain(dto);

            await this._repo.AddAsync(estadoHumor);

            await this._unitOfWork.CommitAsync();

            return EstadoHumorMapper.toDTO(estadoHumor);
        }

        public async Task<EstadoHumorDTO> UpdateAsync(Guid id, EstadoHumorDTO dto)
        {
            var estadoHumor = await this._repo.GetByIdAsync(new EstadoHumorID(id)); 

            if (estadoHumor == null)
                return null;   

            if(dto.Icon!=null)
            estadoHumor.ChangeIcon(dto.Icon);
            
            if(dto.Nome!=null)
            estadoHumor.ChangeNome(dto.Nome);

            if(dto.DescricaoEstadoHumor!=null)
            estadoHumor.ChangeDescricao(dto.DescricaoEstadoHumor);
            
            await this._unitOfWork.CommitAsync();

           return EstadoHumorMapper.toDTO(estadoHumor);
        }

        
        public async Task<EstadoHumorDTO> DeleteAsync(EstadoHumorID id)
        {
            var estadoHumor = await this._repo.GetByIdAsync(id); 

            if (estadoHumor == null)
                return null;   

            
            this._repo.Remove(estadoHumor);
            await this._unitOfWork.CommitAsync();

           return EstadoHumorMapper.toDTO(estadoHumor);
             }

    }



}