using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.EstadosHumor;


namespace _21s5_df_32_proj.Domain.EstadosHumor
{
    public class EstadoHumorMapper
    {
    
        public static EstadoHumorDTO toDTO(EstadoHumor eh)
        {
            return new EstadoHumorDTO(eh);
        }

        public static EstadoHumor toDomain(EstadoHumorDTO dto)
        {
            return new EstadoHumor(dto.Nome, dto.Icon, dto.DescricaoEstadoHumor);
        }

         public static EstadoHumor toDomain(CreatingEstadoHumorDTO dto)
        {
            return new EstadoHumor(dto.Nome, dto.Icon, dto.DescricaoEstadoHumor);
        }
       
}
}