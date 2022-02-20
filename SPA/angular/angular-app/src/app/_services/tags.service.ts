import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tag } from '../tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http:HttpClient) { }

  url='https://21s5df32app.azurewebsites.net/api/Tag/';

  getTags(): Observable<[Tag]>{
    return this.http.get<[Tag]>(this.url)
  }

  getTagByID(id: string): Observable<Tag>{

    return this.http.get<Tag>(this.url+id);

  }


  getTagByTitulo(titulo: string): Observable<Tag>{

    return this.http.get<Tag>(this.url+"t/"+titulo);

  }

  postTag(titulo: string){
    var uToPost={
      titulo:titulo
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(uToPost);

    console.log(body);

    return this.http.post<Tag>(this.url, body, {'headers':headers});
  }

  deleteTag(id: string){
    return this.http.delete<Tag>(this.url+id+'/hard');
  }

  putTag(id:string, titulo: string){

    var uToPut={
      id:id,
      titulo:titulo
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(uToPut);

    console.log(body);

    return this.http.put<Tag>(this.url+id, body, {'headers':headers});
  }
}
