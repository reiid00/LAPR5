namespace _21s5_df_32_proj.Domain.EstadosHumor
{
    public class CreatingEstadoHumorDTO
    {
        
        public string Nome { get; set; }
        public string Icon{get; set;}

        public string DescricaoEstadoHumor{get; set;}

        public CreatingEstadoHumorDTO(string nome, string icon, string descricao)
        {
            this.Nome=nome;
            this.Icon=icon;
            this.DescricaoEstadoHumor = descricao;
        }
    }
}