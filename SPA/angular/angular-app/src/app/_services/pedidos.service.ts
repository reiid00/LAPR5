import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pedido} from '../modules/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient) { }
  
  pedidos;

  url = 'https://21s5df32app.azurewebsites.net/api/Pedido/'  

  getPedidosUserInter(idUser: string): Observable<[Pedido]>{
    return this.http.get<[Pedido]>(this.url+idUser+"/userInter");
  }
  getPedidosUserObjetivo(idUser: string): Observable<[Pedido]>{
    return this.http.get<[Pedido]>(this.url+idUser+"/userObjetivo");
  }

  postPedido(descricaoUserInter: string, descricaoUserFinal:string, estadoPedido: string,descricaoIntroducao:string,
      userAutenticado:string, userIntermedio:string, userObjetivo:string,
     aceiteUserIntermedio: boolean, aceiteUserObjetivo: boolean, userID1:string, 
     userID2:string,relationType:string,strength:number,tituloPedido:string){
    var pedToPost={
      descricaoUserInter: descricaoUserInter,
      descricaoUserFinal: descricaoUserFinal,
      estadoPedido: estadoPedido,
      descricaoIntroducao: descricaoIntroducao,
      userAutenticado: userAutenticado,
      userIntermedio: userIntermedio,
      userObjetivo: userObjetivo,
      aceiteUserIntermedio: aceiteUserIntermedio,
      aceiteUserObjetivo: aceiteUserObjetivo,
      userID1: userID1,
      userID2: userID2,
      relationType: relationType,
      strength: strength,
      tituloPedido: tituloPedido
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pedToPost);

    console.log(body);

    return this.http.post<Pedido>(this.url, body, {'headers':headers});
  }

  putPedidoUserInter(id: string){
  
    var pedId={
      id:id
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pedId);


   return this.http.put<Pedido>(this.url+id+'/userInter', body, {'headers':headers});


  }

  putPedidoUserObjetivo(id: string){
    var pedToPost={
      id: id
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pedToPost);

    console.log(body);

    return this.http.put<Pedido>(this.url+id+"/userObjetivo", body, {'headers':headers});
  }

  deletePedido(id: string){
    return this.http.delete<Pedido>(this.url+id+'/hard');
  }
  
  

}
