import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {GraphService} from '../graph/graph.service';
import { Utilizador } from '../utilizador';
import { TokenStorageService } from '../_services/token-storage.service';
import { RelationService } from '../relation.service';
import { Relation } from '../relation';
import { GraphInfoService } from '../graph/graph-info.service';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.css']
})
export class MiniMapComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  private currentUser: Utilizador=this.token.getUser();

  constructor(private graphService: GraphService, 
    private relationsService: RelationService, 
    private token: TokenStorageService,
    private processGraphInfo: GraphInfoService
    ) { }


  private relacoesFromService: [Relation];
  private relacoes: Relation[];

  ngOnInit(): void {
    

    this.buildBasicScene();
    

  }

  private async buildBasicScene(){
    
    console.log("Step one -- ", this.currentUser.id);

    const relacoesFromService$ = this.relationsService.getRelationFriends(this.currentUser.id).pipe(map(response=>response));
      
    this.relacoesFromService=await lastValueFrom(relacoesFromService$); 
    
    //console.log("Step two relacoesFromService -- ", this.relacoesFromService);

    await this.processGraphInfo.processUserRootRelations(this.relacoesFromService);
    
    //console.log("Step three -- ", this.processGraphInfo.usersInformation[0]);

    this.graphService.buildBaseMiniMap(this.currentUser, this.processGraphInfo.usersInformation, this.rendererCanvas)
 
  }
}
