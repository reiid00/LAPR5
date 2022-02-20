using System;

namespace _21s5_df_32_proj.Domain.EstadosHumor
{
    public class EstadoHumorDTO
    {
        public Guid Id { get; set; }
       public string Nome { get; set; }
        public string Icon{get; set;}

        public string DescricaoEstadoHumor{get; set;}

        public EstadoHumorDTO(EstadoHumor est)
        {
            this.Id = est.Id.AsGuid();      
            this.Nome = est.Nome.MyName;
            this.Icon = est.Icon.MyIcon;
            this.DescricaoEstadoHumor = est.DescricaoEstadoHumor.MyDescricao;
        }
        [Newtonsoft.Json.JsonConstructor]
        public EstadoHumorDTO(string nome, string icon, string descricao)
        {
            this.Nome = nome;
            this.Icon = icon;
            this.DescricaoEstadoHumor = descricao;
        }
    }
}