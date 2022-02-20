import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../post';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  url='http://localhost:10628/api/posts';

  getPostsByAutorId(autorId: string): Observable<Post>{
    return this.http.get<Post>(this.url+'/'+autorId);
  }

  postPost(texto: string,tags: string[],autorId:string){
    var pToPost={
      texto:texto,
      tags:tags,
      likes : 0,
      dislikes: 0,
      autorId: autorId,
      likesUsers: [],
      dislikesUsers: []
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pToPost);

    console.log(body);

    return this.http.post<Post>(this.url, body, {'headers':headers});
  }

  /*deletePost(id: string){
    return this.http.delete<Post>(this.url+id+'/hard');
  }*/

  putPost(id:string, texto: string,tags:string[],comentarios:string[],likes:number,
    dislikes:number,autorId:string,likesUsers:string[],dislikesUsers:string[]){

    var pToPut={
      id:id,
      texto:texto,
      tags:tags,
      comentarios: comentarios,
      likes: likes,
      dislikes: dislikes,
      autorId: autorId,
      likesUsers: likesUsers,
      dislikesUsers: dislikesUsers
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pToPut);

    //console.log(body);

    return this.http.put<Post>(this.url, body, {'headers':headers});
  }
}
