using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Text.RegularExpressions;
using _21s5_df_32_proj.Domain.EstadosHumor;
using _21s5_df_32_proj.Domain.Tags;
using System.Collections.Generic;

namespace _21s5_df_32_proj.Domain.Utilizadores
{

    public class Utilizador : Entity<UtilizadorID> , IAggregateRoot
    {

        private const int MIN=16;

        public UtilizadorNome Nome {get; private set;}

        public UtilizadorEmail Email {get; private set;}

        public UtilizadorDataNascimento DataNascimento {get; private set;}

        public UtilizadorPassword Password {get; private set;}

        public UtilizadorPontuacao Pontuacao {get; private set;}
        
        public UtilizadorDescricao Descricao {get; private set;}

        public UtilizadorNumTelemovel NumTelemovel {get; private set;}

        public UtilizadorCidade Cidade {get; private set;}
        
        public UtilizadorPais Pais {get; private set;}

        public UtilizadorAvatar Avatar {get; private set;}

        public EstadoHumorID EstadoHumorId {get; private set;}

        public EstadoHumor EstadoHumor {get; private set;}

        public IList<TagUtilizador> TagUtilizadores {get; private set;}


        public bool Active{ get;  private set; }


        public Utilizador(string nome, string utilizadorEmail, DateTime utilizadorDataNascimento,
        string utilizadorPassword,string descricao, string numTelemovel, string pais,
         string cidade, string avatar, string estadoHumorId,List<string> tags){
            
            this.Id=new UtilizadorID(Guid.NewGuid());

            this.Nome=new UtilizadorNome(nome);
                
            this.Email=new UtilizadorEmail(utilizadorEmail);

            this.DataNascimento=new UtilizadorDataNascimento(utilizadorDataNascimento);

            this.Password=new UtilizadorPassword(utilizadorPassword);

            this.Pontuacao=new UtilizadorPontuacao(0);
            
            this.Descricao=new UtilizadorDescricao(descricao);

            this.NumTelemovel=new UtilizadorNumTelemovel(numTelemovel);

            this.Pais=new UtilizadorPais(pais);

            this.Cidade=new UtilizadorCidade(cidade);

            this.Avatar=new UtilizadorAvatar(avatar);

            this.EstadoHumorId=new EstadoHumorID(estadoHumorId);
            
            this.TagUtilizadores = new List<TagUtilizador>();
            
            foreach (string tag in tags){
                TagUtilizador t = new TagUtilizador(tag,Id);
                this.TagUtilizadores.Add(t);
            }

            this.Active = true;

        }
        
       

        private Utilizador(){
            this.Active = true;
        }

        public void ChangeNome(string nome){

            this.Nome=new UtilizadorNome(nome);

        }

        public void ChangeEmail(string utilizadorEmail){
            this.Email=new UtilizadorEmail(utilizadorEmail);
        }

        public void ChangeDataNascimento(DateTime utilizadorDataNascimento){
            this.DataNascimento=new UtilizadorDataNascimento(utilizadorDataNascimento);
        }

        public void ChangePassword(string utilizadorPassword){
            this.Password=new UtilizadorPassword(utilizadorPassword);
        }

        public void ChangePontuacao(int utilizadorPontuacao){
            this.Pontuacao=new UtilizadorPontuacao(utilizadorPontuacao);
        }

        public void ChangeDescricao (string descricao){

            this.Descricao=new UtilizadorDescricao(descricao);
        }
        
        public void ChangeAvatar(string avatar){

            this.Avatar=new UtilizadorAvatar(avatar);

        }
    
        public void ChangeNumTelemovel(string num){

            this.NumTelemovel=new UtilizadorNumTelemovel(num);
            
        }
        
        public void ChangePais(string pais){

            this.Pais=new UtilizadorPais(pais);

        }
        
        public void ChangeCidade(string cidade){

            this.Cidade=new UtilizadorCidade(cidade);
            
        }

        public void ChangeEstadoHumorId(string estadoHumorId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possivel mudar o Estado de Humor de um Utilizador desativado.");
            if (estadoHumorId == null)
                throw new BusinessRuleValidationException("Todo Utilizador deve ter um Estado de Humor.");
            this.EstadoHumorId = new EstadoHumorID(estadoHumorId);
        }

        public void ChangeTagUtilizadores(List<string> tags)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possivel mudar as Tags de um Utilizador desativado.");
            if (tags == null)
                throw new BusinessRuleValidationException("Todo Utilizador deve ter uma lista de Tags associada.");
            
            this.TagUtilizadores = new List<TagUtilizador>();

           /* if (tags.Count==0)
                throw new BusinessRuleValidationException("Deve ter especificada ao menos uma Tag na lista.");*/ //Removido porque as listas de tags vão e vêm sempre vazias
            
            foreach (string tag in tags){
                TagUtilizador t = new TagUtilizador(tag,Id);
                this.TagUtilizadores.Add(t);
            }
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public override string ToString(){
            return "Utilizador: " + Id + ", Email: " + Email + ", Pontuacao: " + Pontuacao;
        }

    }

}