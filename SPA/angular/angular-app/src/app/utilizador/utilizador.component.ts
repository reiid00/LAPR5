import { Component, OnInit } from '@angular/core';
import { Utilizador } from '../utilizador';
import { UtilizadorService } from '../_services/utilizador.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-utilizador',
  templateUrl: './utilizador.component.html',
  styleUrls: ['./utilizador.component.css']
})
export class UtilizadorComponent implements OnInit {

  constructor(private utilizadorService:UtilizadorService,private token: TokenStorageService) { }
  
  currentUser: any;
 
  utilizadores: Utilizador[]=[];

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    
  }

  
  utilizadorById:Utilizador;

  utilizadorByEmail:Utilizador;

  utilizadorPost:Utilizador;

  utilizadorDelete:Utilizador;

  utilizadorPut:Utilizador;

  getById(id:string){
    this.utilizadorService.getUtilizadorByID(id).subscribe(utilizadores=>this.utilizadorById=utilizadores);
  }

  getByEmail(email:string,password:string){
    this.utilizadorService.getUtilizadorByEmail(email,password).subscribe(utilizadores=>this.utilizadorByEmail=utilizadores);
  }

  getUtilizadores(){
    this.utilizadorService.getUtilizadores().subscribe(utilizadores=>this.utilizadores=utilizadores);
  }

  postEstadoHumor(nome: string, email:string, dataNascimento:Date,password:string,
    avatar:string,cidade:string,pais:string,descricao:string,numTelemovel:string,
    estadoHumorId: string,Tags: [string]){
    this.utilizadorService.postUtilizador(nome, email, dataNascimento,password,avatar,
      cidade,pais,descricao,numTelemovel,estadoHumorId,Tags).subscribe(utilizadores=>this.utilizadorPost=utilizadores);
  }

  putEstadoHumor(id:string, nome: string, email:string, dataNascimento:Date,password:string,
    avatar:string,cidade:string,pais:string,descricao:string,numTelemovel:string,
    estadoHumorId: string,Tags: string[]){
    this.utilizadorService.putUtilizador(id, nome, email, dataNascimento,password,avatar,
      cidade,pais,descricao,numTelemovel,estadoHumorId,Tags).subscribe(utilizadores=>this.utilizadorPut=utilizadores);
  }

  deleteEstadoHumor(id:string){
    this.utilizadorService.deleteUtilizador(id).subscribe(utilizadores=>this.utilizadorDelete=utilizadores);
  }




}
