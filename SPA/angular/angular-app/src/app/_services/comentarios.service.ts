import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Comentario } from '../comentario';
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http:HttpClient) { }

  url='http://localhost:10628/api/comentarios';

  getComentarioById(id: string): Observable<Comentario>{
    return this.http.get<Comentario>(this.url+'/'+id);
  }

  postComentario(texto: string,tags: string[],post:string,autorId:string){
    var cToPost={
      texto:texto,
      tags:tags,
      post:post,
      autorId: autorId,
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(cToPost);

    console.log(body);

    return this.http.post<Comentario>(this.url, body, {'headers':headers});
  }

  /*deleteComentario(id: string){
    return this.http.delete<Comentario>(this.url+id+'/hard');
  }*/

  putComentario(id:string, texto: string,tags: string[],post:string,autorId:string){

    var pToPut={
      id:id,
      texto:texto,
      tags:tags,
      post:post,
      autorId: autorId,
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pToPut);

    console.log(body);

    return this.http.put<Comentario>(this.url, body, {'headers':headers});
  }
}
