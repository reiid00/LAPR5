import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Relation } from './relation';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  constructor(private http:HttpClient) { }

  url='https://21s5df32app.azurewebsites.net/api/Relation/';

  getRelations(): Observable<[Relation]>{
    return this.http.get<[Relation]>(this.url)
  }

  getRelationByID(id: string): Observable<Relation>{

    return this.http.get<Relation>(this.url+id);

  }

  getNetByPerspective(id: string): Observable<[Relation]>{
    return this.http.get<[Relation]>(this.url+"netByPerspective/"+id);
  }
  
  getRelationFriends(id: string): Observable<[Relation]>{
    return this.http.get<[Relation]>(this.url+"friends/"+id);
  }

  getRelationNewFriends(id:string,id1:string):Observable<[Relation]>{
    console.log(this.url+"newFriends"+id+"/"+id1);
    return this.http.get<[Relation]>(this.url+"newFriends/"+id+"/"+id1);
  }


  getReverseRelationsFromList(listToReverse: [Relation]): Observable<[Relation]>{
    const body=JSON.stringify(listToReverse);
    const headers = { 'content-type': 'application/json'}  
    
    return this.http.post<[Relation]>(this.url+"reverseRelationsFromList", body, {'headers':headers});
  }


  postRelation(UserID1:string,  UserID2:string, relationTypes:  string, strength: number){
  
    var relToPost={
      userID1:UserID1, 
       userID2:UserID2, 
       relationTypes : [relationTypes],
      strength: strength
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(relToPost);

    console.log(body);

    return this.http.post<Relation>(this.url, body, {'headers':headers});
  }

  deleteRelation(id: string){
    return this.http.delete<Relation>(this.url+id+'hard');
  }

  getLeaderBoardsFortaleza(){
    return this.http.get<[string]>(this.url+'leaderboardFortaleza');
  }

  getStrengthByUser(id : string){
    return this.http.get<number>(this.url+'strength/'+id);
  }

  getStrengthTotal(id : string, id2: string){
    return this.http.get<number>(this.url+'strengthTotal/'+id+'/'+id2);
  }

getTamanhoRede(id : string, n : number){
  return this.http.get<number>(this.url+'tamanhoRede/'+ n+'/'+id);
}


  putRelation(id:string,UserID1:string,  UserID2:string, relationTypes:  string, strength: number){
    var relToPost={
      id:id,
      userID1:UserID1, 
       userID2:UserID2, 
       relationTypes:[relationTypes],
        strength: strength
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(relToPost);

    console.log(body);

    return this.http.put<Relation>(this.url+id, body, {'headers':headers});
  }

  

}
