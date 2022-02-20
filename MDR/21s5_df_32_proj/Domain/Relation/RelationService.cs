using System.Threading.Tasks;
using System.Collections.Generic;
using _21s5_df_32_proj.Domain.Shared;
using System;
using _21s5_df_32_proj.Domain.Utilizadores;

namespace _21s5_df_32_proj.Domain.Relations
{

    public class RelationService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IRelationRepository _repo;




        public RelationService(IUnitOfWork unitOfWork, IRelationRepository repo)
        {

            this._unitOfWork = unitOfWork;
            this._repo = repo;

        }

        public async Task<List<RelationDto>> GetAllAsync()
        {

            var list = await this._repo.GetAllAsync();

            List<RelationDto> listDto = list.ConvertAll<RelationDto>(

                Relation => RelationMapper.toDTO(Relation));

            return listDto;

        }

        public async Task<List<RelationDto>> GetNetByPerspective(UtilizadorID id)
        {
            //Console.Write("MY ID", id);
             var list = await this._repo.GetFromUserIdAsync(id);
            
            List<RelationDto> listDto = new List<RelationDto>();

            List<UtilizadorID> inserted=new List<UtilizadorID>();

            for (var i = 0; i < list.Count; i++)
            {
                listDto.Add(RelationMapper.toDTO(list[i]));
                
                UtilizadorID userID1=list[i].UserID1;
                inserted.Add(userID1);

                UtilizadorID userID2=list[i].UserID2;

                if (!inserted.Contains(userID2))
                {
                    inserted.Add(userID2);
                    var secondList = await this._repo.GetFromUserIdAsync(userID2);

                    for(var j=0; j<secondList.Count; j++){
                        
                        UtilizadorID userID3=secondList[j].UserID2; //E.G. userID1->userID2 (first iteration) userID2->userID3 (second Iteration)
                        if(!inserted.Contains(userID3)){

                            listDto.Add(RelationMapper.toDTO(secondList[j]));
                            inserted.Add(userID3);

                        }
                    }
                    
                }
            }

            return listDto;
        }


        public async Task<List<RelationDto>> GetReverseRelationsFromList(List<RelationDto> listToReverse){
           
            List<RelationDto> reversedList = new List<RelationDto>();

            foreach (RelationDto relation in listToReverse)
            {
                UtilizadorID userID1=new UtilizadorID(relation.UserID1);
                UtilizadorID userID2=new UtilizadorID(relation.UserID2);

                //Parameters are reversed to get reversed relation
                Relation reverseRelation = await this._repo.GetRelationFromUsersIDsAsync(userID2, userID1);

                if(reverseRelation==null){
                    Console.WriteLine("Error in relation: "+ relation.Id.ToString()+"\n");
                }else{
                    Console.WriteLine("ID1: "+ reverseRelation.UserID1.ToString()+" Id2:"+reverseRelation.UserID2.ToString()+ "\n");
                    reversedList.Add(RelationMapper.toDTO(reverseRelation));                   
                }
            }

            return reversedList;
        }



        public async Task<List<RelationDto>> GetFriends(string id)
        {

            var list = await this._repo.GetAllAsync();

            List<RelationDto> listDto = new List<RelationDto>();

            for (var i = 0; i < list.Count; i++)
            {
                if (list[i].UserID1.Value.Equals(id))
                {
                    listDto.Add(RelationMapper.toDTO(list[i]));
                }
            }

            return listDto;

        }

        public async Task<List<RelationDto>> GetNewFriends(string id, string id2)
        {

            var list = await this._repo.GetAllAsync();

            List<RelationDto> listDto = new List<RelationDto>();

            bool isFriend = false;

            for (var i = 0; i < list.Count; i++)
            {
                isFriend = false;
                if (list[i].UserID1.Value.Equals(id))
                {
                    if (list[i].UserID2.Value.Equals(id2))
                    {

                    }
                    else
                    {
                        for (var j = 0; j < list.Count; j++)
                        {

                            if (list[j].UserID1.Value.Equals(id2) && list[j].UserID2.Value.Equals(list[i].UserID2.Value))
                            {
                                isFriend = true;
                            }


                        }
                        if (!isFriend)
                        {
                            listDto.Add(RelationMapper.toDTO(list[i]));
                        }

                    }
                }
            }

            return listDto;

        }

     

        public async Task<List<string>> getLeaderBoardsFortaleza()
        {

            var list = await this._repo.GetAllAsync();

            List<string> listIDs = new List<string>();


            //adicionar todos os users a lista listIDs para saber o numero de users na rede
            for (var i = 0; i < list.Count; i++)
            {
                if (listIDs.Contains(list[i].UserID1.Value))
                {

                }
                else
                {
                    listIDs.Add(list[i].UserID1.Value);
                }
            }

            //passar o num de users para variavel
            var k = listIDs.Count;

            string[,] arrayIds = new string[k, 2];


            //passar os users para o array de users q vai conter a strength de cada um
            for (var i = 0; i < listIDs.Count; i++)
            {
                arrayIds[i, 0] = listIDs[i];
                var j = 0;
                arrayIds[i, 1] = j.ToString();
            }

            int l = 0;

            // Lista de arrays criada Desta Forma  User: Forca total

            for (var i = 0; i < list.Count; i++)
            {
                bool verUser = false;

                //verifica se ja existe o user na lista, se existir apenas adiciona a strength dessa relacao
                for (var j = 0; j < k; j++)
                {
                    if (arrayIds[j, 0].Equals(list[i].UserID1.Value))
                    {
                        int result = int.Parse(arrayIds[j, 1]);
                        arrayIds[j, 1] = (result + list[i].Strength.Value).ToString();
                        verUser = true;
                    }
                }

                //se nao existir, adiciona o user e a strength da relacao em questao a lista
                if (!verUser)
                {
                    arrayIds[l, 0] = list[i].UserID1.Value;
                    arrayIds[l, 1] = list[i].Strength.Value.ToString();
                    l++;
                }

            }
            // Organizar Lista por forca
            int[] intArray = new int[k];


            //criar lista com as strengths todas
            for (var i = 0; i < k; i++)
            {
                intArray[i] = int.Parse(arrayIds[i, 1]);
            }

            Array.Sort(intArray);

            Array.Reverse(intArray);


            listIDs.Clear();

            // Adicionar a lista final de strings o userID de acordo com a forca
            for (var i = 0; i < k; i++)
            {
                for (var j = 0; j < k; j++)
                {
                    if (intArray[i] == int.Parse(arrayIds[j, 1]))
                    {
                        listIDs.Add(arrayIds[j, 0]);
                        arrayIds[j, 0] = "a";
                        arrayIds[j, 1] = "-1";
                    }
                }


            }

            return listIDs;


        }

        public async Task<int> getStrengthByUser(string id1)
        {
            var list = await this._repo.GetAllAsync();
            int k = 0;

            for (var i = 0; i < list.Count; i++)
            {
                if (id1.Equals(list[i].UserID1.Value))
                {
                    k += list[i].Strength.Value;
                }
            }


            return k;
        }

        public async Task<int> getStrengthTotal(string id, string id2)
        {
            var list = await this._repo.GetAllAsync();
            int k = 0;

            for (var i = 0; i < list.Count; i++)
            {
                if (id.Equals(list[i].UserID1.Value) && id2.Equals(list[i].UserID2.Value))
                {
                    k += list[i].Strength.Value;
                }
                if (id2.Equals(list[i].UserID1.Value) && id.Equals(list[i].UserID2.Value))
                {
                    k += list[i].Strength.Value;
                }
            }



            return k;
        }


        public async Task<int> getTamanhoRede(string id, int n)
        {
            int k = 0;


            var list = await this._repo.GetAllAsync();

            List<string> listIDs = new List<string>();
            listIDs.Add(id);

            //verifica para o tamanho da rede

            for (var j = 0; j < n; j++)
            {
                //criada variavel para saber o total de users antes do loop e nao atualizar quando receber novos users
                var l = listIDs.Count;
                // verifica para cada user na lista
                for (var m = 0; m < l; m++)
                {

                    // verifica para cada relacao
                    for (var i = 0; i < list.Count; i++)
                    {

                        // se o userID1 for igual ao user escolhido, verifica se ja existe na lista o amigo, se nao existir adiciona o
                        if (list[i].UserID1.Value.Equals(listIDs[m]) && !listIDs.Contains(list[i].UserID2.Value))
                        {
                            listIDs.Add(list[i].UserID2.Value);
                        }
                    }


                }
            }

            k = listIDs.Count;


            // para retirar o utilizador inicial
            k--;



            return k;
        }





        public async Task<RelationDto> GetByIdAsync(RelationID id)
        {

            var Relation = await this._repo.GetByIdAsync(id);

            return (Relation == null ? null : RelationMapper.toDTO(Relation));

        }

        public async Task<RelationDto> AddAsync(RelationDto dto)
        {

            Relation rel = new Relation(dto.UserID1, dto.UserID2, dto.RelationTypes, dto.Strength);

            await this._repo.AddAsync(rel);

            await this._unitOfWork.CommitAsync();

            return RelationMapper.toDTO(rel);
        }

        public async Task<RelationDto> UpdateAsync(RelationDto dto)
        {
            var Relation = await this._repo.GetByIdAsync(new RelationID(dto.Id));

            if (Relation == null)
                return null;

            Relation.addRelationTypes(dto.RelationTypes);

            Relation.changeStrength(dto.Strength);

            await this._unitOfWork.CommitAsync();

            return RelationMapper.toDTO(Relation);
        }


        public async Task<RelationDto> DeleteAsync(RelationID id)
        {
            var Relation = await this._repo.GetByIdAsync(id);

            if (Relation == null)
                return null;


            this._repo.Remove(Relation);
            await this._unitOfWork.CommitAsync();

            return RelationMapper.toDTO(Relation);
        }

    }



}