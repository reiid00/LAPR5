import { Component, Input, OnInit } from '@angular/core';
import { EstadoHumor } from '../estado-humor';
import { EstadohumorService } from '../_services/estadohumor.service';

@Component({
  selector: 'app-estadohumor',
  templateUrl: './estadohumor.component.html',
  styleUrls: ['./estadohumor.component.css']
})
export class EstadohumorComponent implements OnInit {

  constructor(private estadoHumorService:EstadohumorService) { }
  
 
  estadosHumor: EstadoHumor[]=[];

  ngOnInit(): void {
    
  }

  
  estadoHumorById:EstadoHumor;

  estadoHumorPost:EstadoHumor;

  estadoHumorDelete:EstadoHumor;

  estadoHumorPut:EstadoHumor;

  getById(id:string){
    this.estadoHumorService.getEstadoHumorByID(id).subscribe(estadosHumor=>this.estadoHumorById=estadosHumor);
  }

  getEstadosHumor(){
    this.estadoHumorService.getEstadosHumor().subscribe(estadosHumor=>this.estadosHumor=estadosHumor);
  }

  postEstadoHumor(nome:string, icon:string, descricaoEstadoHumor:string){
    this.estadoHumorService.postEstadoHumor(nome, icon, descricaoEstadoHumor).subscribe(estadosHumor=>this.estadoHumorPost=estadosHumor);
  }

  putEstadoHumor(id:string, nome:string, icon:string, descricaoEstadoHumor:string){
    this.estadoHumorService.putEstadoHumor(id, nome, icon, descricaoEstadoHumor).subscribe(estadosHumor=>this.estadoHumorPut=estadosHumor);
  }

  deleteEstadoHumor(id:string){
    this.estadoHumorService.deleteEstadoHumor(id).subscribe(estadosHumor=>this.estadoHumorDelete=estadosHumor);
  }




}
