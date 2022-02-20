using System;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Shared;

namespace _21s5_df_32_proj.Domain.Relations
{
    public class CreatingRelationDto
    {

        public string UserID1 { get; set; }
        public string UserID2 { get; set; }
        public List<string> RelationTypes { get; set; }
        public int Strength { get; set; }



        public CreatingRelationDto(string UserID1, string UserID2, List<string> RelationTypes, int Strength){
            this.UserID1=UserID1;
            this.UserID2=UserID2;
            this.RelationTypes=RelationTypes;
            this.Strength = Strength;
        }
    }
}