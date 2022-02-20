using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Pedidos;


namespace _21s5_df_32_proj.Domain.Pedidos
{
    public class PedidoMapper
    {
    
        public static PedidoDTO toDTO(Pedido ped)
        {
            return new PedidoDTO(ped);
        }

        public static Pedido toDomain(PedidoDTO dto)
        {
            return new Pedido(dto.DescricaoUserInter, dto.DescricaoUserFinal, dto.EstadoPedido,dto.DescricaoIntroducao,dto.UserAutenticado,dto.UserIntermedio,dto.UserObjetivo,dto.AceiteUserIntermedio,dto.AceiteUserObjetivo,dto.UserID1,dto.UserID2,dto.RelationType,dto.Strength,dto.TituloPedido);
        }
       
}
}