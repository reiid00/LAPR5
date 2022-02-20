import { Component, OnInit } from '@angular/core';
import { RelationService } from '../../relation.service';
import { UtilizadorService } from '../../_services/utilizador.service';
import { Utilizador } from 'src/app/utilizador';
import { lastValueFrom, map } from 'rxjs';
@Component({
  selector: 'app-dimensao-rede',
  templateUrl: './dimensao-rede.component.html',
  styleUrls: ['./dimensao-rede.component.css']
})
export class DimensaoRedeComponent implements OnInit {
  
  userIDList:string [] = [];
  userSelectedList:string [] = [];
  userSelect:string;
  userSelecionado : Utilizador;
  numSelecionado : number;
  strengthList:number [] = [];

  allUsers: Utilizador [] = [];

  allUsersDef: Utilizador [] = [];

  usersNetworkDimension : number [] = [];

  usersNetworkDimensionDef : number [] = [];



  constructor(private relationsService: RelationService,private utilizadorService: UtilizadorService) { }




  private async getAllUsersFriends()
  {
    
    const usersFromService$ = this.utilizadorService.getUtilizadores().pipe(map(response=>response));
      
    this.allUsers=await lastValueFrom(usersFromService$); 

    for (var i = 0; i< this.allUsers.length ; i++)
    {
      const friendsOfUser$ = this.relationsService.getRelationFriends(this.allUsers[i].id).pipe(map(response=>response));
      const friends = await lastValueFrom(friendsOfUser$);
      this.usersNetworkDimension.push(friends.length);
    }

    for (var i = 1; i < this.allUsers.length; i++)
    {
      for (var j = 0; j < i; j++)
      {
        if (this.usersNetworkDimension[j] < this.usersNetworkDimension[i]) {
          var x = this.usersNetworkDimension[i];
          this.usersNetworkDimension[i] = this.usersNetworkDimension[j];
          this.usersNetworkDimension[j] = x;

          var k = this.allUsers[i];
          this.allUsers[i] = this.allUsers[j];
          this.allUsers[j] = k;
        }

      }
    }

      this.allUsersDef = this.allUsers;
      this.usersNetworkDimensionDef = this.usersNetworkDimension;
    
        
    

  }

  

  ngOnInit(): void {

    this.getAllUsersFriends();
  }

}
