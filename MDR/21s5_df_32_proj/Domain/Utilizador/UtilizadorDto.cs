using System;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.EstadosHumor;
using System.Collections.Generic;

namespace _21s5_df_32_proj.Domain.Utilizadores
{
    public class UtilizadorDto
    {
        public string Id {get; set;}

       public string Nome {get; set;}

        public string Email {get; set;}

        public DateTime DataNascimento {get; set;}

        public string Password {get; set;}

         public int Pontuacao {get; set;}

         public string Descricao {get; set;}
        
        public string Avatar {get; set;}
        
        public string Pais {get; set;}
        
        public string Cidade {get; set;}
        
        public string NumTelemovel {get; set;}

        public string EstadoHumorId {get; set;}

        public List<string> Tags { get; set; }

        public UtilizadorDto(Utilizador u)
        {
            this.Id = u.Id.AsString();
            this.Nome=u.Nome.MyName;
            this.Email=u.Email.MyUtilizadorEmail;
            this.DataNascimento=u.DataNascimento.MyUtilizadorDataNascimento;
            this.Password=u.Password.MyUtilizadorPassword;
            this.Pontuacao=u.Pontuacao.MyUtilizadorPontuacao;

            this.Descricao=u.Descricao.MyDescricao;
            this.NumTelemovel=u.NumTelemovel.NumTelemovel;
            this.Pais=u.Pais.MyPais;
            this.Cidade=u.Cidade.myCity;
            this.Avatar=u.Avatar.myAvatar;

        }


        public UtilizadorDto(string nome, string utilizadorEmail, DateTime utilizadorDataNascimento,
        string utilizadorPassword,string descricao, string numTelemovel, string pais,
         string cidade, string avatar, string estadoHumorId, List<string> tags)
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
            this.EstadoHumorId=estadoHumorId;
            this.Tags=tags;

        }

        [Newtonsoft.Json.JsonConstructor]

        public UtilizadorDto(string id,string nome, string utilizadorEmail, DateTime utilizadorDataNascimento,
        string utilizadorPassword,string descricao, string numTelemovel, string pais,
         string cidade, string avatar,string estadoHumorId, List<string> tags)
        {
            this.Id=id;
            this.Nome = nome;
            this.Email=utilizadorEmail;
            this.DataNascimento=utilizadorDataNascimento;
            this.Password=utilizadorPassword;
            this.Descricao=descricao;
            this.NumTelemovel=numTelemovel;
            this.Pais=pais;
            this.Cidade=cidade;
            this.Avatar=avatar;
            this.EstadoHumorId=estadoHumorId;
            this.Tags=tags;
        }
    }
}