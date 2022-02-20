import { RelationService } from './../relation.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UtilizadorService } from '../_services/utilizador.service';
import { PedidosService } from '../_services/pedidos.service';
import { Pedido } from '../modules/pedido';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {User} from '../search-box/User';
import { Utilizador } from '../utilizador';
import { lastValueFrom, map } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit //,AfterViewInit, OnDestroy
{

  /** list of users */
  public users;
  title= "Search for user"
  searchText;
  currentUser:Utilizador;
  PedidoPost;

  


  constructor(private http:HttpClient, private userService: UtilizadorService,
     private pedidoService: PedidosService,
     private token: TokenStorageService,
     private relationService: RelationService) { }

  getUser(){
    this.userService.getUtilizadores().subscribe(users=>this.users=users);
  }
  ngOnInit() {
    this.getUser();
    this.currentUser = this.token.getUser();
    

  }

  async addUser(userId){
    const relationFromService$ = this.relationService.getRelationFriends(userId).pipe(map(response=>response));
      
    const relations =await lastValueFrom(relationFromService$); 
    var isFriend = false;
    for (var i = 0; i< relations.length;i++)
    {
      if(relations[i].userID2 == this.currentUser.id)
      {
        isFriend = true;
      }

    }
    if(isFriend)
    {
      window.alert("Não é possível adicionar um amigo/a!");

      this.reloadPage();
    } else {
      if(userId == this.currentUser.id)
      {
        window.alert("Não é possível adicionar-se!");

        this.reloadPage();
      } else {
        var p={
          descricaoUserInter: "descricao",
          descricaoUserFinal: "descricao",
          estadoPedido : "a decorrer",
          descricaoIntroducao: "descricaoIntroducao",
          userAutenticado: this.currentUser.id,
          userIntermedio: null,
          userObjetivo: userId,
          aceiteUserIntermedio : true,
          aceiteUserObjetivo : false,
          userID1: this.currentUser.id,
          userID2: userId,
          relationType : "amigos",
          strength: 1,
          tituloPedido: "tituloPedido"
        }
        this.pedidoService.postPedido(p.descricaoUserInter,p.descricaoUserFinal,
          p.estadoPedido,p.descricaoIntroducao,p.userAutenticado,
          p.userIntermedio,p.userObjetivo,p.aceiteUserIntermedio,
          p.aceiteUserObjetivo,p.userID1,p.userID2,p.relationType,
          p.strength, p.tituloPedido).subscribe(pedido=>this.PedidoPost=pedido);
    
          window.alert("Pedido Enviado!");
    
          this.reloadPage();
  
      }
      }
    
  }

  reloadPage(): void {
    window.location.reload();
  }

}
