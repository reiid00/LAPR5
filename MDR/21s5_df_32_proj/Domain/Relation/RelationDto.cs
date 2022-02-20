using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Relations
{
    public class RelationDto
    {
        public string Id {get; set;}

        public string UserID1 { get; set; }
        public string UserID2 { get; set; }
        public List<string> RelationTypes { get; set; }
        public int Strength { get; set; }



        private RelationDto(){}
        public RelationDto(string Id, string UserID1, string UserID2, List<string> RelationTypes, int Strength){
            this.Id=Id;
            this.UserID1=UserID1;
            this.UserID2=UserID2;
            this.RelationTypes=RelationTypes;
            this.Strength = Strength;
        }

        public RelationDto(CreatingRelationDto dto){
            this.UserID1=dto.UserID1;
            this.UserID2=dto.UserID2;
            this.RelationTypes=dto.RelationTypes;
            this.Strength=dto.Strength;
        }

        public RelationDto(Relation rel){
            this.Id=rel.Id.AsString();
            this.UserID1=rel.UserID1.AsString();
            this.UserID2=rel.UserID2.AsString();
            List<string> types = new List<string>();
            foreach(RelationType type in rel.RelationTypes){
                types.Add(type.Value);
            }
            this.RelationTypes=types;
            this.Strength=rel.Strength.Value;
        }
    }
}