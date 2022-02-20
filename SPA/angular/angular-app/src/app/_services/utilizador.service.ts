import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Utilizador } from '../utilizador';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  constructor(private http:HttpClient) { }


  url='https://21s5df32app.azurewebsites.net/api/Utilizador/';

  getUtilizadores(): Observable<[Utilizador]>{
    return this.http.get<[Utilizador]>(this.url)
  }

  getUtilizadorByID(id: string): Observable<Utilizador>{

    return this.http.get<Utilizador>(this.url+id);

  }

  login(email: string, password: string): Observable<Utilizador> {
     return this.http.get<Utilizador>(this.url+email+"/"+password);
  }

  getUtilizadorByEmail(email: string, password:string): Observable<Utilizador>{

    return this.http.get<Utilizador>(this.url+email+"/"+password);

  }

  postUtilizador(nome: string, email:string, dataNascimento:Date,password:string,
    avatar:string,cidade:string,pais:string,descricao:string,numTelemovel:string,
    estadoHumorId: string,Tags: [string]){
    var uToPost={
      nome:nome,
      email:email,
      dataNascimento:dataNascimento,
      password:password,
      avatar:avatar,
      cidade:cidade,
      pais:pais,
      descricao:descricao,
      numTelemovel:numTelemovel,
      estadoHumorId:estadoHumorId,
      Tags: Tags
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(uToPost);

    console.log(body);

    return this.http.post<Utilizador>(this.url, body, {'headers':headers});
  }

  deleteUtilizador(id: string){
    return this.http.delete<Utilizador>(this.url+id+'/hard');
  }

  putUtilizador(id:string, nome: string, email:string, dataNascimento:Date,password:string,
    avatar:string,cidade:string,pais:string,descricao:string,numTelemovel:string,
    estadoHumorId: string,Tags: string[]){

    var uToPut={
      id:id,
      nome:nome,
      email:email,
      dataNascimento:dataNascimento,
      password:password,
      avatar:avatar,
      cidade:cidade,
      pais:pais,
      descricao:descricao,
      numTelemovel:numTelemovel,
      estadoHumorId:estadoHumorId,
      Tags:Tags
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(uToPut);

    console.log(body);

    return this.http.put<Utilizador>(this.url+id, body, {'headers':headers});
  }

  

}
