using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Tags;

namespace _21s5_df_32_proj.Domain.Utilizadores
{
    public class UtilizadorMapper
    {
        public static UtilizadorDto toDTO(CreatingUtilizadorDto obj)
        {
            List<string> tags = new List<string>(obj.Tags);
            return new UtilizadorDto(obj.Nome, obj.Email, obj.DataNascimento,obj.Password,obj.Descricao,obj.NumTelemovel,obj.Pais,obj.Cidade,obj.Avatar,obj.EstadoHumorID,tags);
        }

        public static UtilizadorDto toDTO(Utilizador obj)
        {
            
            List<string> list = new List<string>();

            foreach (TagUtilizador tag in obj.TagUtilizadores)
            {
              list.Add(tag.Tag.Titulo.MyTitulo);
            }

            return new UtilizadorDto(obj.Id.AsString(), obj.Nome.MyName, obj.Email.MyUtilizadorEmail, 
            obj.DataNascimento.MyUtilizadorDataNascimento,obj.Password.MyUtilizadorPassword,
            obj.Descricao.MyDescricao,obj.NumTelemovel.NumTelemovel,obj.Pais.MyPais,obj.Cidade.myCity,obj.Avatar.myAvatar,obj.EstadoHumorId.AsString(),list);
        }

        public static Utilizador toDomain(UtilizadorDto dto)
        {
            return new Utilizador(dto.Nome, dto.Email, dto.DataNascimento,dto.Password,dto.Descricao,dto.NumTelemovel,dto.Pais,dto.Cidade,dto.Avatar,dto.EstadoHumorId,dto.Tags);
        }
       
}
}