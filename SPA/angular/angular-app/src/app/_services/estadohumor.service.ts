import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoHumor } from '../estado-humor';

@Injectable({
  providedIn: 'root'
})
export class EstadohumorService {

  constructor(private http:HttpClient) { }


  url='https://21s5df32app.azurewebsites.net/api/EstadosHumor/';

  getEstadosHumor(): Observable<[EstadoHumor]>{
    return this.http.get<[EstadoHumor]>(this.url);
  }

  getEstadoHumorByID(id: string): Observable<EstadoHumor>{

    return this.http.get<EstadoHumor>(this.url+id);

  }

  postEstadoHumor(nome: string, icon:string, descricaoEstadoHumor:string){
    var ehToPost={
      nome:nome,
      icon:icon,
      descricaoEstadoHumor:descricaoEstadoHumor
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(ehToPost);

    console.log(body);

    return this.http.post<EstadoHumor>(this.url, body, {'headers':headers});
  }

  deleteEstadoHumor(id: string){
    return this.http.delete<EstadoHumor>(this.url+id+'/hard');
  }

  putEstadoHumor(id:string, nome:string, icon:string, descricaoEstadoHumor:string){

    var ehToPut={
      id:id,
      nome:nome,
      icon:icon,
      descricaoEstadoHumor:descricaoEstadoHumor
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(ehToPut);

    console.log(body);

    return this.http.put<EstadoHumor>(this.url+id, body, {'headers':headers});
  }

  

}
