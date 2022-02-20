import { Component, OnInit } from '@angular/core';
import { RelationService } from '../relation.service';
import { Utilizador } from '../utilizador';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserNewConexionsService } from '../_services/user-new-conexions.service';
import { UtilizadorService } from '../_services/utilizador.service';
import { lastValueFrom, map } from 'rxjs';
import { PedidosService } from '../_services/pedidos.service';

@Component({
  selector: 'app-user-new-conexions',
  templateUrl: './user-new-conexions.component.html',
  styleUrls: ['./user-new-conexions.component.css']
})
export class UserNewConexionsComponent implements OnInit {

  constructor(private userNewConexionService:UserNewConexionsService,
    private token: TokenStorageService, private relationsService:RelationService,private utilizadorService:UtilizadorService,private pedidoService:PedidosService) { }
  
    private currentUser:Utilizador;
    newConexions:Utilizador[] = new Array();
    smallNewConexions:Utilizador[] = new Array();
    tagsInCommon: string [][] = new Array();
    tagsInCommonNum: number [] = new Array();
    userChosenBool : boolean;
    userChosen: Utilizador;
    pedidoPost;
    private i = 0;
    m;

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getNewConexions();
  }

  private async getNewConexions()
  {
    
    const relacoesFromService$ = this.relationsService.getRelationFriends(this.currentUser.id).pipe(map(response=>response));
      
    const friendsFromService=await lastValueFrom(relacoesFromService$); 


    const allUsers$ = this.utilizadorService.getUtilizadores().pipe(map(response=>response));
      
    const users=await lastValueFrom(allUsers$); 

    this.userChosenBool = false;


    this.newConexions = this.userNewConexionService.newConexions(this.currentUser,friendsFromService,users);

    this.getNewSmallNewConexions();


    
  }

  public getNewSmallNewConexions()
  {
      for (var j = 0; j < 5; j ++)
      {
        this.smallNewConexions[j] = this.newConexions[this.i];
        this.getConexionNewUser(j,this.smallNewConexions[j]);
        this.i++;
        if(this.i == this.newConexions.length)
          this.i = 0;
      }
   
  }

  private getConexionNewUser(i:number,userChosen: Utilizador)
  { 
    var tags : string [] = new Array();
    tags = this.userNewConexionService.returnTagsInCommon(this.currentUser,userChosen);
    this.tagsInCommonNum[i] = tags.length;
    for ( var j = 0 ; j < tags.length ; j++)
    {
      this.tagsInCommon[i].push(tags[j]);
    }
  }

  public viewMoreDetails(userSelected : Utilizador, m : number) : void {
    this.m = m;
    this.userChosenBool = true;
    this.userChosen = userSelected;

  }

  public newFriendRequest(newFriend : Utilizador) : void{
    var p={
      descricaoUserInter: "descricao",
      descricaoUserFinal: "descricao",
      estadoPedido : "a decorrer",
      descricaoIntroducao: "descricaoIntroducao",
      userAutenticado: this.currentUser.id,
      userIntermedio: null,
      userObjetivo: newFriend.id,
      aceiteUserIntermedio : true,
      aceiteUserObjetivo : false,
      userID1: this.currentUser.id,
      userID2: newFriend.id,
      relationType : "amigos",
      strength: 1,
      tituloPedido: "tituloPedido"
    }
    this.pedidoService.postPedido(p.descricaoUserInter,p.descricaoUserFinal,
      p.estadoPedido,p.descricaoIntroducao,p.userAutenticado,
      p.userIntermedio,p.userObjetivo,p.aceiteUserIntermedio,
      p.aceiteUserObjetivo,p.userID1,p.userID2,p.relationType,
      p.strength, p.tituloPedido).subscribe(pedido=>this.pedidoPost=pedido);

      window.alert("Pedido CRIADO PARA UTILIZADOR: " + newFriend.nome);

      this.reloadPage();
  }

  
reloadPage(): void {
  window.location.reload();
}



}
