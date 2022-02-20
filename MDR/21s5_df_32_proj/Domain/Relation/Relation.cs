using System;
using _21s5_df_32_proj.Domain.Shared;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Controllers;

namespace _21s5_df_32_proj.Domain.Relations
{

    public class Relation: Entity<RelationID>
    {

        // public string UserID1 { get; private set; }
        // public string UserID2 { get; private set; }

        public UtilizadorID UserID1 {get;private set;}
        public virtual Utilizador User1 {get; private set;}
        public UtilizadorID UserID2 {get;private set;}
        public virtual Utilizador User2 {get; private set;}
        public List<RelationType> RelationTypes { get; private set; }
        public RelationStrength Strength { get; private set; }

        private Relation() { }

        public Relation(string UserID1, string UserID2, List<string> relationTypes, int strength){

            this.RelationTypes = new List<RelationType>();
            foreach (string relationType in relationTypes){
                RelationType element = new RelationType(relationType);
                this.RelationTypes.Add(element);
            }

            this.UserID1=new UtilizadorID(UserID1);
            this.UserID2 = new UtilizadorID(UserID2);
            this.Strength = new RelationStrength(strength);
            this.Id= new RelationID(Guid.NewGuid());
        }

        public string toString(){
            return UserID1+", "+this.UserID2+", " + string.Join(",", RelationTypes) + ", " + this.Strength.toString();
        }

        public void addRelationTypes(List<string> Types){
            if (Types.Count == 0){
                throw new BusinessRuleValidationException("One ore more relation types must be chosen.");
            }
            foreach (string type in Types){
                RelationType element = new RelationType(type);
                this.RelationTypes.Add(element);
            }
        }

        public void changeStrength(int strength){
            this.Strength= new RelationStrength(strength);
        }

        

        
    }
}