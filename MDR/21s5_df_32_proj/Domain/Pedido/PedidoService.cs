//Utilizador A pretende ligar-se ao utilizador C, amigo em comum B

//UC 11 - User A faz um pedido a user B para que o introduza a C


//UC 12 - User B recebe o pedido e aceita ou rejeita


//UC 33 - Caso o user B aceite, user C recebe o pedido e aceite ou rejeita 

using System.Threading.Tasks;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Shared;
using System;

namespace _21s5_df_32_proj.Domain.Pedidos
{

    public class PedidoService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IPedidoRepository _repo;


        public PedidoService(IUnitOfWork unitOfWork, IPedidoRepository repo)
        {

            this._unitOfWork = unitOfWork;
            this._repo = repo;

        }

        public async Task<List<PedidoDTO>> GetAllAsync()
        {

            var list = await this._repo.GetAllAsync();

            List<PedidoDTO> listDTO = list.ConvertAll<PedidoDTO>(

                pedido => PedidoMapper.toDTO(pedido)
            );
            return listDTO;

        }

        public async Task<List<PedidoDTO>> GetAllAsyncByUserInterPendente(string idUser){
           
            var list = await this._repo.GetAllAsync();

            
            List<PedidoDTO> listDTO = new List<PedidoDTO>();

            for(int i = 0;i<list.Count;i++){
                if(list[i].PedidoIntroducao.UserIntermedio != null)
                {
                    if(list[i].PedidoIntroducao.UserIntermedio.Equals(idUser) ){
                        if(list[i].PedidoIntroducao.AceiteIntermedio.Equals(false)){
                             listDTO.Add( PedidoMapper.toDTO(list[i]));

                        }

                    } 
                }
               
            }
                return listDTO;
        }

        public async Task<List<PedidoDTO>> GetAllAsyncByUserObjetivoPendente(string idUser){
            var list = await this._repo.GetAllAsync();

            List<PedidoDTO> listDTO =new List<PedidoDTO>();
                for(int i = 0;i<list.Count;i++){
                if(list[i].PedidoIntroducao.UserObjetivo!= null)
                {
                     if(list[i].PedidoIntroducao.UserObjetivo.Equals(idUser)){
                        if(list[i].PedidoIntroducao.AceiteIntermedio.Equals(true)){

                             if(list[i].PedidoIntroducao.AceiteFinal.Equals(false)){
                             listDTO.Add( PedidoMapper.toDTO(list[i]));

                             }
                        }

                    } 
                }
               
               
            }           
                return listDTO;
        }


        public async Task<PedidoDTO> GetByIdAsync(PedidoID id)
        {

            var pedido = await this._repo.GetByIdAsync(id);

            return (pedido == null ? null : PedidoMapper.toDTO(pedido));
        }


            public async Task<PedidoDTO> AddAsync(CreatingPedidoDTO dto){

            var pedido = new Pedido(dto.DescricaoUserInter,dto.DescricaoUserFinal,dto.EstadoPedido,dto.DescricaoIntroducao,dto.UserAutenticado,dto.UserIntermedio,dto.UserObjetivo,dto.AceiteUserIntermedio,dto.AceiteUserObjetivo,dto.UserID1,dto.UserID2,dto.RelationType,dto.Strength,dto.TituloPedido);

            await this._repo.AddAsync(pedido);

            await this._unitOfWork.CommitAsync();

            return PedidoMapper.toDTO(pedido);

                }


         public async Task<PedidoDTO> UpdateAsync(PedidoDTO dto)
        {
            var pedido = await this._repo.GetByIdAsync(new PedidoID(dto.Id)); 

            if (pedido == null)
                return null;   

            pedido.ChangeDescricaoPedido(dto.DescricaoUserInter,dto.DescricaoUserFinal);
            pedido.ChangeEstadoPedido(dto.EstadoPedido);
            pedido.ChangePedidoIntroducao(dto.DescricaoIntroducao, dto.UserAutenticado, dto.UserObjetivo, dto.UserIntermedio,dto.AceiteUserIntermedio,dto.AceiteUserObjetivo);
            pedido.ChangePedidoLigacao(dto.UserID1, dto.UserID2, dto.RelationType, dto.Strength);
            pedido.ChangeTituloPedido(dto.TituloPedido);
            
            await this._unitOfWork.CommitAsync();

             return PedidoMapper.toDTO(pedido);     

             }

         public async Task<PedidoDTO> UpdateUserB(PedidoDTO dto)
        {
            var pedido = await this._repo.GetByIdAsync(new PedidoID(dto.Id)); 

            if (pedido == null)
                return null;   

           pedido.PedidoIntroducao.AceitarPedidoIntermedio();
           
            await this._unitOfWork.CommitAsync();

            return PedidoMapper.toDTO(pedido);     
     }



         public async Task<PedidoDTO> UpdateUserC(PedidoDTO dto)
        {
            var pedido = await this._repo.GetByIdAsync(new PedidoID(dto.Id)); 

            if (pedido == null)
                return null;   

            pedido.PedidoIntroducao.AceitarPedidoFinal();

 
            
            await this._unitOfWork.CommitAsync();
            
             return PedidoMapper.toDTO(pedido);    
     }



         public async Task<PedidoDTO> DeleteAsync(PedidoID id)
        {
            var pedido = await this._repo.GetByIdAsync(id); 

            if (pedido == null)
                return null;   

            
            this._repo.Remove(pedido);
            await this._unitOfWork.CommitAsync();

       return PedidoMapper.toDTO(pedido);
         }





    }
}

