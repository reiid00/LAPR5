using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;


namespace _21s5_df_32_proj.Domain.Utilizadores{

    public class UtilizadorService{

        private readonly IUnitOfWork _unitOfWork;
        private readonly IUtilizadorRepository _repo;


        public UtilizadorService(IUnitOfWork unitOfWork, IUtilizadorRepository repo){

            this._unitOfWork=unitOfWork;
            this._repo=repo;

        }

        public async Task<List<UtilizadorDto>> GetAllAsync(){
        
            var list = await this._repo.GetAllAsync();

            List<UtilizadorDto> listDto = list.ConvertAll<UtilizadorDto>(

                utilizador => UtilizadorMapper.toDTO(utilizador));
        
            return listDto;

        }

        

        public async Task<UtilizadorDto> GetByIdAsync(UtilizadorID id){

            var utilizador=await this._repo.GetByIdAsync(id);

            return (utilizador==null ? null: UtilizadorMapper.toDTO(utilizador));
            
        }

        public async Task<UtilizadorDto> GetByEmailAsync(UtilizadorEmail email){

            var list = await this._repo.GetAllAsync();

            for ( int i = 0; i < list.Count; i++){
                if(list[i].Email.MyUtilizadorEmail.Equals(email.MyUtilizadorEmail))
                    return UtilizadorMapper.toDTO(list[i]);
            }
            return null;
        }

        public async Task<UtilizadorDto> AddAsync(UtilizadorDto dto){

            var utilizador = UtilizadorMapper.toDomain(dto);

            await this._repo.AddAsync(utilizador);

            await this._unitOfWork.CommitAsync();

            return UtilizadorMapper.toDTO(utilizador);
        }

        public async Task<UtilizadorDto> UpdateAsync(UtilizadorDto dto)
        {
            var utilizador = await this._repo.GetByIdAsync(new UtilizadorID(dto.Id)); 

            if (utilizador == null)
                return null;   

            utilizador.ChangeNome(dto.Nome);

            utilizador.ChangeEmail(dto.Email);
            
            utilizador.ChangeDataNascimento(dto.DataNascimento);

            utilizador.ChangePassword(dto.Password);

            utilizador.ChangePontuacao(dto.Pontuacao);

            utilizador.ChangeAvatar(dto.Avatar);

            utilizador.ChangeCidade(dto.Cidade);

            utilizador.ChangeDescricao(dto.Descricao);

            utilizador.ChangeNumTelemovel(dto.NumTelemovel);

            utilizador.ChangePais(dto.Pais);

            utilizador.ChangeEstadoHumorId(dto.EstadoHumorId);
            
            utilizador.ChangeTagUtilizadores(dto.Tags);

            await this._unitOfWork.CommitAsync();

            return UtilizadorMapper.toDTO(utilizador);
        }


         public async Task<UtilizadorDto> InactivateAsync(UtilizadorID id)
        {
            var utilizador = await this._repo.GetByIdAsync(id); 

            if (utilizador == null)
                return null;   

            utilizador.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return UtilizadorMapper.toDTO(utilizador);
        }

        
       public async Task<UtilizadorDto> DeleteAsync(UtilizadorID id)
        {
            var utilizador = await this._repo.GetByIdAsync(id); 

            if (utilizador == null)
                return null;   

            if (utilizador.Active)
                throw new BusinessRuleValidationException("Não é possível apagar um Utilizador activo.");
            

            this._repo.Remove(utilizador);
            await this._unitOfWork.CommitAsync();

            return UtilizadorMapper.toDTO(utilizador);
        }

    }



}