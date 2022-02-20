import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { RelationService } from '../relation.service';
import { Utilizador } from '../utilizador';
import { EstadohumorComponent } from '../estadohumor/estadohumor.component';
import { EstadoHumor } from '../estado-humor';
import { EstadohumorService } from '../_services/estadohumor.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UtilizadorService } from '../_services/utilizador.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { lastValueFrom, map } from 'rxjs';
import { Tag } from '../tag';
import { TagsService } from '../_services/tags.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Utilizador;
  tamanhoRedeList: number[] = [];
  tamanhoRede:number;

  numeros: number[] = [1, 2]; ;
  numEscolhido : number;
  subscription:Subscription;

  estadosHumor: EstadoHumor[];
  selectedEstadoHumor:EstadoHumor;

  selectedTag:Tag;
  globalTags:Tag[];
  userTags:[string];
  selectFromUserTag:string;

  clickAddTagsEvent:boolean=false;
  clickRemoveTagsEvent:boolean=false;
  clickPasswordEvent:boolean=false;
  clickEmailEvent:boolean=false;
  clickDataNascEvent:boolean=false;
  clickPaisEvent:boolean=false;
  clickCidadeEvent:boolean=false;
  clickNumTelemEvent:boolean=false;
  clickEstadoHumorEvent:boolean=false;
  clickDescricaoEvent:boolean=false;

  estadoHumorById: EstadoHumor;
  fortalezaRede:number;
  
  constructor(private token: TokenStorageService, private tagService:TagsService, private utilizadorService: UtilizadorService, private relationService: RelationService, private estadoHumorService: EstadohumorService ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getEstadoHumorById();
    this.getFortalezeRede();
  }


  async getTamanhoRede(n: number){
   
      let tam$ =  this.relationService.getTamanhoRede(this.currentUser.id,n).pipe(map(response=>response));
      
    this.tamanhoRede=await lastValueFrom(tam$); 

    this.tamanhoRedeList.push(this.tamanhoRede);
  }
  async getFortalezeRede(){
    this.fortalezaRede=0;
   
    let fortFromService$ =  this.relationService.getRelationFriends(this.currentUser.id).pipe(map(response=>response));
    
   var fort =await lastValueFrom(fortFromService$); 

   for(var i = 0; i< fort.length;i++)
   {
      this.fortalezaRede+=fort[i].strength;
   }

}

  getEstadoHumorById(){
    if(this.currentUser!=null){
      this.estadoHumorService.getEstadoHumorByID(this.currentUser.estadoHumorId).subscribe(value=>this.estadoHumorById=value);
    }
  }

  getAllEstadosHumor(){
    this.estadoHumorService.getEstadosHumor().subscribe(value=>this.estadosHumor=value);
  }

  
  getAllTags(){
    this.tagService.getTags().subscribe(value=>this.globalTags=value);
  }

  changeEmail(newEmail:string){
    this.currentUser.email=newEmail;
    this.clickEmailEvent=false;
    this.updateUserDetails();
  }

  changePassword(newPassword:string){
    this.currentUser.password=newPassword;
    this.clickPasswordEvent=false;
    this.updateUserDetails();
  }


  changeDataNascimento(){
    this.updateUserDetails();
    this.clickDataNascEvent=false;
    
  }
  changeNumTelemovel(newTelemovel:string){
    this.currentUser.numTelemovel=newTelemovel;
    this.updateUserDetails();
    this.clickNumTelemEvent=false;
    

  }
  changeCidade(newCidade:string){
    this.currentUser.cidade=newCidade;
    this.updateUserDetails();
    this.clickCidadeEvent=false;
    
  }
  changePais(newPais:string){
    this.currentUser.pais=newPais;
    this.updateUserDetails();
    this.clickPaisEvent=false;
   
  }
  changeDescricao(newDescricao:string){
    this.currentUser.descricao=newDescricao;
    this.updateUserDetails();
    this.clickDescricaoEvent=false;
    
  }
  changeEstadoHumor(){
    this.currentUser.estadoHumorId=this.selectedEstadoHumor.id;
    this.updateUserDetails();
    this.clickEstadoHumorEvent=false;
  }

  


  updateUserDetails(){
    
    this.utilizadorService.putUtilizador(this.currentUser.id.toString(), this.currentUser.nome.toString(),
                                  this.currentUser.email.toString(), this.currentUser.dataNascimento,
                                  this.currentUser.password.toString(), this.currentUser.avatar.toString(),
                                  this.currentUser.cidade.toString(), this.currentUser.pais.toString(), this.currentUser.descricao.toString(),
                                  this.currentUser.numTelemovel.toString(), this.currentUser.estadoHumorId.toString(), this.currentUser.tags ).subscribe(response=>this.currentUser=response);                              
    
    this.token.saveUser(this.currentUser);

    this.reloadPage();
  
    
    }

  addTag(){
    this.currentUser.tags.push(this.selectedTag.titulo);
    this.updateUserDetails();
    this.clickAddTagsEvent=false;
  }

  removeTag(){
    const index = this.currentUser.tags.indexOf(this.selectFromUserTag, 0);
    if (index > -1) {
      this.currentUser.tags.splice(index, 1);
    }
    this.updateUserDetails();
    this.clickRemoveTagsEvent=false;
  }

  onClickAddTags(){
    this.getAllTags();
    this.clickAddTagsEvent=true;
  }

  onClickRemoveTags(){
    this.userTags=this.currentUser.tags;
    this.clickRemoveTagsEvent=true;
  }

  onClickEmail(){
    this.clickEmailEvent=true;
  }
  onClickDataNascimento(){
    this.clickDataNascEvent=true;
  }
  onClickNumTelemovel(){
    this.clickNumTelemEvent=true;
  }
  
  onClickPais(){
    this.clickPaisEvent=true;
  }
  onClickCidade(){
    this.clickCidadeEvent=true;
  }
  onClickEstadoHumor(){
    this.getAllEstadosHumor();
    console.log(this.estadosHumor);
    this.clickEstadoHumorEvent=true;
  }
  onClickDescricao(){
    this.clickDescricaoEvent=true;
  }

  onClickPassword(){
    this.clickPasswordEvent=true;
  }


  reloadPage(): void {
    window.location.reload();
  }
}

