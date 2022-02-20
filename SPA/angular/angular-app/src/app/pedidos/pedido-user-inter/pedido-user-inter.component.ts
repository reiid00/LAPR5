import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { PedidosService } from '../../_services/pedidos.service';
import { UtilizadorService } from '../../_services/utilizador.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Utilizador } from '../../utilizador';
import {Pedido} from '../../modules/pedido';
import {map} from "rxjs";

@Component({
  selector: 'app-pedido-user-inter',
  templateUrl: './pedido-user-inter.component.html',
  styleUrls: ['./pedido-user-inter.component.css'],
  
})




export class PedidoUserInterComponent implements OnInit {

 

  constructor(private pedidosService : PedidosService,private utilizadorService : UtilizadorService,private token: TokenStorageService) { }
  
  nome;
  pedidosUserInter;
  selectedPedidoUserInter?;
  pedidoPutUserInter : Pedido;
  pedidoApagado : Pedido;
  currentUser: Utilizador;
  pessoaAdicionar : Utilizador;
  pessoaAdicionarNome : string[] = [];
  fSelected;
  amigoRel;
  friendRelSelectedNome : string [] = new Array();

  onSelectUserInter(pedUserInter): void {
      this.selectedPedidoUserInter = pedUserInter;
      this.utilizadorService.getUtilizadorByID(this.selectedPedidoUserInter.userID2).subscribe(utilizador =>  { this.pessoaAdicionar=utilizador;this.pessoaAdicionarNome.push(this.pessoaAdicionar.nome) });
    
  }

  aceitarPedidoUserInter(){
    console.log(this.selectedPedidoUserInter.id);
    this.pedidosService.putPedidoUserInter(this.selectedPedidoUserInter.id).subscribe(pedido=>this.pedidoPutUserInter=pedido);
   
    window.alert("Pedido Aceite!");

    this.reloadPage();
    
  }

  deletePedido(id:string): void
  {
    this.pedidosService.deletePedido(id).subscribe(pedido=>this.pedidoApagado=pedido);
    window.alert("Pedido apagado!");
    
    this.reloadPage();
  }

  //Apenas mostrar os pedidos pendentes desse user
  getPedidoUserInter(){
    this.pedidosService.getPedidosUserInter(this.currentUser.id).subscribe(pedidos=>this.pedidosUserInter=pedidos);
  }

  getFriend(pedUserInter): void{
    this.amigoRel = pedUserInter;
    this.utilizadorService.getUtilizadorByID(this.amigoRel.userID1).subscribe(utilizador=> {this.fSelected=utilizador; 
      if( this.fSelected.id == this.currentUser.id){} else {this.friendRelSelectedNome.push(this.fSelected.nome)}});
  }
  


  ngOnInit(): void {

    this.currentUser = this.token.getUser();

    this.getPedidoUserInter();
  }

  reloadPage(): void {
    window.location.reload();
  }

}
