import { Component, OnInit } from '@angular/core';
import { RelationService } from '../../relation.service';
import { UtilizadorService } from '../../_services/utilizador.service';
import { Utilizador } from 'src/app/utilizador';
import {lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-fortaleza-rede',
  templateUrl: './fortaleza-rede.component.html',
  styleUrls: ['./fortaleza-rede.component.css']
})
export class FortalezaRedeComponent implements OnInit {

  constructor(private relationsService: RelationService,private utilizadorService: UtilizadorService) { }
  
              userIDList:string [] = [];
              userSelectedList:string [] = [];
              userSelect:string;
              userSelecionado : Utilizador;
              numSelecionado : number;
              strengthList:number [] = [];

  private async getLeaderboard(){

      const usersFromService$ = this.relationsService.getLeaderBoardsFortaleza().pipe(map(response=>response));
      
      this.userIDList= await lastValueFrom(usersFromService$); 

      for (var i = 0; i < this.userIDList.length;i++)
      {
        const user$ = this.utilizadorService.getUtilizadorByID(this.userIDList[i]).pipe(map(response=>response));
      
       this.userSelecionado= await lastValueFrom(user$); 

       this.userSelectedList.push(this.userSelecionado.nome);

       const strength$ =  this.relationsService.getStrengthByUser(this.userIDList[i]).pipe(map(response=>response));
      
       this.numSelecionado= await lastValueFrom(strength$); 
 
       this.strengthList.push(this.numSelecionado);
 
      }
  
    }


  ngOnInit(): void {
    this.getLeaderboard();
  }

}
