import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../_services/pedidos.service';
import { Utilizador } from '../../utilizador';
import { TokenStorageService } from '../../_services/token-storage.service';
import { RelationService } from '../../relation.service';
import { UtilizadorService } from '../../_services/utilizador.service';
import {Relation} from '../../relation';


@Component({
  selector: 'app-criar-pedido',
  templateUrl: './criar-pedido.component.html',
  styleUrls: ['./criar-pedido.component.css']
})
export class CriarPedidoComponent implements OnInit {



  constructor(private utilizadorService : UtilizadorService,
              private relationsService: RelationService,
              private pedidosService : PedidosService,
              private token: TokenStorageService) { }

 
  friendRelSelectedNome : string [] = [];
  friendSelectedNome : string [] = [];
  friendRelationSelectedList;
  friendSelectedList;   
  //Apenas para colocar na lista de Amigos
  relation:Relation;
  amigoRel;
  amigo?;
  isChosen = false;
  friendRelSelected?;
  fSelected;
  personToAdd;
  userAutenticado?;
  userObjetivo?;
  userIntermedio?;
  estadoPedido?;
  descricaoIntroducao?;
  descricaoUserFinal?;
  descricaoUserInter?;
  PedidoPost;
  currentUser: Utilizador;

  criarPedido(descricaoUserInter,descricaoUserFinal): void {
    var pedToPost={
      descricaoUserInter: descricaoUserInter,
      descricaoUserFinal: descricaoUserFinal,
      estadoPedido : "a decorrer",
      descricaoIntroducao: "descricaoIntroducao",
      userAutenticado: this.currentUser.id,
      userIntermedio: this.amigoRel.userID2,
      userObjetivo: this.fSelected.userID2,
      aceiteUserIntermedio : false,
      aceiteUserObjetivo : false,
      userID1: this.currentUser.id,
      userID2: this.fSelected.userID2,
      relationType : "amigos",
      strength: 1,
      tituloPedido: "tituloPedido"
    };
    this.pedidosService.postPedido(pedToPost.descricaoUserInter,pedToPost.descricaoUserFinal,
      pedToPost.estadoPedido,pedToPost.descricaoIntroducao,pedToPost.userAutenticado,
      pedToPost.userIntermedio,pedToPost.userObjetivo,pedToPost.aceiteUserIntermedio,
      pedToPost.aceiteUserObjetivo,pedToPost.userID1,pedToPost.userID2,pedToPost.relationType,
      pedToPost.strength, pedToPost.tituloPedido).subscribe(pedido=>this.PedidoPost=pedido);
    window.alert("Pedido Criado!");

    this.reloadPage();
  }


      // Amigos do User
  getFriendsRelations(){
        this.relationsService.getRelationFriends(this.currentUser.id).subscribe(response=>this.friendRelationSelectedList=response);  
  }


  getFriend(pedUserInter): void{
    this.amigoRel = pedUserInter;
    this.utilizadorService.getUtilizadorByID(this.amigoRel.userID2).subscribe(utilizador=> {this.fSelected=utilizador; 
      if( this.fSelected.id == this.currentUser.id){} else {this.friendRelSelectedNome.push(this.fSelected.nome)}});
  }

  selectedFriendRel(selectedRel:Relation){
    this.friendRelSelected=selectedRel;
    this.relationsService.getRelationNewFriends(this.friendRelSelected.userID2,this.friendRelSelected.userID1).subscribe(response=>this.friendSelectedList=response);
  }

  selectedFriend(selected:Relation){
    this.fSelected = selected;
  }

  getFriendAfterRel(pedUserInter): void{
    this.amigo = pedUserInter;
    this.utilizadorService.getUtilizadorByID(this.amigo.userID2).subscribe(utilizador=> {this.fSelected=utilizador;
      if( this.fSelected.id == this.currentUser.id){} else {this.friendSelectedNome.push(this.fSelected.nome)}});
  }

 

     
    
  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getFriendsRelations();
  }

}
