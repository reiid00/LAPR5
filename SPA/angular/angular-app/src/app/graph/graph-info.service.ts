import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { Relation } from '../relation';
import { RelationService } from '../relation.service';
import { Utilizador } from '../utilizador';
import { TokenStorageService } from '../_services/token-storage.service';
import { UtilizadorService } from '../_services/utilizador.service';
import { CaminhoMaisForte } from 'src/info_cam_forte';
@Injectable({
  providedIn: 'root'
})
export class GraphInfoService {

  constructor(private token: TokenStorageService, private utilizadorService : UtilizadorService, private relationsService:RelationService, private http:HttpClient) { }

  url='http://localhost:4300/api/';

  currentUser:Utilizador=this.token.getUser();

  public usersInformation:Utilizador[]=new Array();
  public utilizador:Utilizador;
  public userInfoMatrix: any[][]=new Array();

 public async processUserRootRelations(relacoes: [Relation]){
    var i=0;

    for(i=0; i<relacoes.length; i++){

      const utilizador$ = this.utilizadorService.getUtilizadorByID(relacoes[i].userID2).pipe(map(response=>response));
     
      var utilizador:Utilizador= await firstValueFrom(utilizador$);

      if(!this.usersInformation.includes(utilizador)){
        //Guarda todos os users recebidos com userID2
        this.usersInformation[i]=utilizador;
      }
        
    }



  }

  public getUserWithIDFromList(id:string, utilizadores:Utilizador[]): Utilizador{

    for(var i=0; i<utilizadores.length; i++){

      if(utilizadores[i].id==id){
        return utilizadores[i];
      }

    }
    return null;
  }

  public getRelationStrengthFromList(id1:string,id2:string, relations:Relation[]): string{

    for(var i=0; i<relations.length; i++){
      if(relations [i] != null){
        if(relations[i].userID1==id1){
          if(relations[i].userID2==id2){
            return relations[i].strength.toString();
          }
        }
  
      }
     
    }
    return null;
  }


  
  public getCaminhoMaisForte(origId:string, destId:string):Observable<CaminhoMaisForte>{
 
    var reqBody={
      origId:origId,
      destId:destId
    }
    const body=JSON.stringify(reqBody);
    const headers = { 'content-type': 'application/json'} 
    return this.http.post<CaminhoMaisForte>(this.url+"CaminhoMaisForte", body, {'headers':headers})
  }
  
  public getDimensaoDaRede(uId:string, n:number):Observable<string>{
    
    var reqBody={
      n:String(n),
      userID:uId
    }
    const body=JSON.stringify(reqBody);
    const headers = { 'content-type': 'application/json'} 
    
    return this.http.post<string>(this.url+"RedeUtilizador", body, {'headers':headers})
  }


  public getRelacoesDoCamMaisForte(caminhoObj: CaminhoMaisForte, relacoes:Relation[]): [Relation]{
    var relacoesIniciais=relacoes;

    var relacoesFinais:[Relation];

    var caminho:[string]=caminhoObj.caminho;

    var j=0;

    for(var i=0; i<relacoesIniciais.length; i++){

      if(caminho[j]==(relacoesIniciais[i].userID1) && caminho[j+1]==relacoesIniciais[i].userID2){
        relacoesIniciais.push(relacoesIniciais[i]);
        j++;
      }
      
      if(j==caminho.length)
        break;

    }

    return relacoesFinais;
    
  }
   
  }






