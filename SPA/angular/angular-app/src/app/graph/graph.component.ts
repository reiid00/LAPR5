import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {GraphService} from './graph.service';
import { Utilizador } from '../utilizador';
import { TokenStorageService } from '../_services/token-storage.service';
import { RelationService } from '../relation.service';
import { Relation } from '../relation';
import { GraphInfoService } from './graph-info.service';
import { lastValueFrom, map } from 'rxjs';
import { Graph3dService } from './graph3d/graph3d.service';
import { EstadohumorService } from '../_services/estadohumor.service';
import { CaminhoMaisForte } from 'src/info_cam_forte';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy{

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  private currentUser: Utilizador=this.token.getUser();

  constructor(private graphService: GraphService, 
    private relationsService: RelationService, 
    private token: TokenStorageService,
    private processGraphInfo: GraphInfoService,
    private graph3dservice: Graph3dService,
    private estadoHumorService: EstadohumorService,
    ) { }


  private relacoesFromService: [Relation];
  private relacoes: Relation[];
  private reversedRelacoes: Relation[];

  private camMaisForte: CaminhoMaisForte;
  ngOnInit(): void {
    
    //this.buildCaminhoMaisForte();
    
    this.build3DScene();

  }

  private async buildCaminhoMaisForte(){

    const camMaisForte$ =  this.processGraphInfo.getCaminhoMaisForte("a0c03c51-399d-401f-9d26-2ebb42722c11","28eb1a08-b501-40da-addc-4710046845a3").pipe(map(response=>response));
    this.camMaisForte=await lastValueFrom(camMaisForte$);
    
    var relacoesCamForte:[Relation]=this.processGraphInfo.getRelacoesDoCamMaisForte(this.camMaisForte, this.relacoes);
    
    const reversedCamForte$ =  this.relationsService.getReverseRelationsFromList(relacoesCamForte).pipe(map(response=>response));
    var reversedCamForte:Relation[]=await lastValueFrom(reversedCamForte$);

    //Build graph
  }
  private async buildBasicScene(){
    
    const relacoesFromService$ = this.relationsService.getNetByPerspective(this.currentUser.id).pipe(map(response=>response));  
    this.relacoesFromService=await lastValueFrom(relacoesFromService$); 
    
    
   

    await this.processGraphInfo.processUserRootRelations(this.relacoesFromService);
    this.graphService.buildBasicScene(this.currentUser, this.processGraphInfo.usersInformation, this.relacoesFromService, this.rendererCanvas)
 
  }


  public async build3DScene(){

    const relacoesFromService$ = this.relationsService.getNetByPerspective(this.currentUser.id).pipe(map(response=>response));
    this.relacoesFromService=await lastValueFrom(relacoesFromService$); 
    
    const reversedRelacoesFromService$ =  this.relationsService.getReverseRelationsFromList(this.relacoesFromService).pipe(map(response=>response));
    this.reversedRelacoes=await lastValueFrom(reversedRelacoesFromService$);

    await this.processGraphInfo.processUserRootRelations(this.relacoesFromService);
   
    const estadosHumorFromService$ = this.estadoHumorService.getEstadosHumor().pipe(map(response=>response));
      
    const estadosHumor =await lastValueFrom(estadosHumorFromService$); 

    this.graph3dservice.buildBasicScene(this.currentUser, this.processGraphInfo.usersInformation, this.relacoesFromService, this.reversedRelacoes, this.rendererCanvas, estadosHumor);

  }

  ngOnDestroy() {
    this.graph3dservice.ngOnDestroy();
      console.log('Cleared');
  }



}
