import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../_services/pedidos.service';
import { UtilizadorService } from '../../_services/utilizador.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { RelationService } from '../../relation.service';
import { Utilizador } from '../../utilizador';
import {Pedido} from '../../modules/pedido';


@Component({
  selector: 'app-pedido-user-objetivo',
  templateUrl: './pedido-user-objetivo.component.html',
  styleUrls: ['./pedido-user-objetivo.component.css']
})
export class PedidoUserObjetivoComponent implements OnInit {

  

 

  constructor(private pedidosService : PedidosService, private utilizadorService : UtilizadorService,private token: TokenStorageService, private relationsService: RelationService) { }

  pedidosUserObjetivo;
  pessoaIntermedia;
  currentUser: Utilizador;
  selectedPedidoUserObjetivo;
  pedidoPutUserObjetivo : Pedido;
  pedidoApagado : Pedido;
  relationUserAToC;
  relationUserCToA;

  pessoaUserInterNome: string[] = [];
  fSelected;
  amigoRel;
  friendRelSelectedNome : string [] = new Array();
  

  onSelectUserObjetivo(pedUserObjetivo): void{
  
    this.selectedPedidoUserObjetivo = pedUserObjetivo;
    this.utilizadorService.getUtilizadorByID(this.selectedPedidoUserObjetivo.userIntermedio).subscribe(utilizador=> {this.pessoaIntermedia=utilizador;
       if(this.pessoaIntermedia.id === this.currentUser.id){} else {this.pessoaUserInterNome.push(this.pessoaIntermedia.nome)}});
  }


  aceitarPedidoUserObjetivo() : void{
    this.pedidosService.putPedidoUserObjetivo(this.selectedPedidoUserObjetivo.id).subscribe(pedido=>this.pedidoPutUserObjetivo=pedido);
     
//Cria Relacao User A to User C

    this.relationsService.postRelation(this.selectedPedidoUserObjetivo.userID1,
      this.selectedPedidoUserObjetivo.userID2,this.selectedPedidoUserObjetivo.relationType,
      this.selectedPedidoUserObjetivo.strength).subscribe(relation=>this.relationUserAToC=relation);~

//Cria Relacao User C to User A

      this.relationsService.postRelation(this.selectedPedidoUserObjetivo.userID2,
        this.selectedPedidoUserObjetivo.userID1, this.selectedPedidoUserObjetivo.relationType,
        this.selectedPedidoUserObjetivo.strength).subscribe(relation=>this.relationUserCToA=relation);
    window.alert("Pedido Aceite!");

    //Apaga o pedido

    this.pedidosService.deletePedido(this.selectedPedidoUserObjetivo.id).subscribe(pedido=>this.pedidoApagado=pedido);

    this.reloadPage();
    
  }

  deletePedido(id:string): void
  {
    this.pedidosService.deletePedido(id).subscribe(pedido=>this.pedidoApagado=pedido);
    window.alert("Pedido apagado!");
    
    this.reloadPage();
  }

  getPedidoUserObjetivo(){
    this.pedidosService.getPedidosUserObjetivo(this.currentUser.id).subscribe(pedidos=>this.pedidosUserObjetivo=pedidos);
 
   }

   getFriend(pedUserObjetivo): void{
    this.amigoRel = pedUserObjetivo;
    console.log(this.amigoRel.userID1);
    this.utilizadorService.getUtilizadorByID(this.amigoRel.userID1).subscribe(utilizador=> {this.fSelected=utilizador;
      this.friendRelSelectedNome.push(this.fSelected.nome)});
  }


  ngOnInit(): void {

    this.currentUser = this.token.getUser();

    this.getPedidoUserObjetivo();

  }

  reloadPage(): void {
    window.location.reload();
  }


}
