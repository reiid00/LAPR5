using System;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.EstadosHumor;
using System.Collections.Generic;

namespace _21s5_df_32_proj.Domain.Utilizadores
{
    public class CreatingUtilizadorDto
    {

       public string Nome {get; set;}

        public string Email {get;  set;}

        public DateTime DataNascimento {get;  set;}

        public string Password {get;  set;}

        public string Avatar {get; set;}
        
        public string Cidade {get; set;}
        
        public string Pais {get; set;}
        
        public string Descricao {get; set;}

        public string NumTelemovel {get; set;}

        public string EstadoHumorID {get; set;}

        public string[] Tags {get; set;}

        public CreatingUtilizadorDto(string nome, string utilizadorEmail, DateTime utilizadorDataNascimento,
        string utilizadorPassword,string descricao, string numTelemovel, string pais,
         string cidade, string avatar, string estadoHumorId, string[] tags)
        {
            this.Nome = nome;
            this.Email=utilizadorEmail;
            this.DataNascimento=utilizadorDataNascimento;
            this.Password=utilizadorPassword;
            this.Descricao=descricao;
            this.NumTelemovel=numTelemovel;
            this.Pais=pais;
            this.Cidade=cidade;
            this.Avatar=avatar;
            this.EstadoHumorID=estadoHumorId;
            this.Tags=tags;
        }
    }
}