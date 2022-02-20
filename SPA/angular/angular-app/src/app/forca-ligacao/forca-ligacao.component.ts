import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from '../_services/utilizador.service';
import { RelationService } from '../relation.service';
import { Utilizador } from '../utilizador';
import { Relation } from '../relation';

@Component({
  selector: 'app-forca-ligacao',
  templateUrl: './forca-ligacao.component.html',
  styleUrls: ['./forca-ligacao.component.css']
})
export class ForcaLigacaoComponent implements OnInit {

  constructor(private userService: UtilizadorService,private relationService: RelationService) { }
  
  public users;
  userFriends;
  title= "Consultar força de ligação entre dois utilizadores"
  searchText;
  userRelation :Relation;
  strengthTotal:number;
  userChosen:boolean;
  amigoChosen:boolean;
  userEscolhidoId:string;
  userEscolhidoNome:string;
  amigoNome:string;
  
  userSelectedList:string [] = [];

  userSelect:Relation;
  userSelecionado:Utilizador;

  getUser(){
    this.userService.getUtilizadores().subscribe(users=>this.users=users);
  }

  ngOnInit(): void {
    this.getUser();
    this.userChosen=false;
    this.amigoChosen=false;
  }

  getUserNome(userSelected):void{
    this.userSelect = userSelected;
    this.userSelectedList = [];
    this.userService.getUtilizadorByID(userSelected.userID2).subscribe(utilizador=> {this.userSelecionado=utilizador; 
       {this.userSelectedList.push(this.userSelecionado.nome)}});
  }



  
  addUser(userF){
    this.userFriends = [];
    this.userEscolhidoId=userF.id;
    this.userEscolhidoNome=userF.nome;
    this.userChosen=true;
    this.amigoChosen=false;
    this.relationService.getRelationFriends(userF.id).subscribe(value=>this.userFriends=value);
  }

  escolherAmigo(user,amigoNome){
    this.amigoChosen=true;
    this.amigoNome=amigoNome;
    this.userRelation = user;
    this.relationService.getStrengthTotal(this.userRelation.userID1,this.userRelation.userID2).subscribe(value=>this.strengthTotal=value);


  }

}
