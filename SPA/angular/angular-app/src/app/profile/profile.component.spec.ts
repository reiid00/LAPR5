import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RelationService } from '../relation.service';
import { EstadohumorService } from '../_services/estadohumor.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UtilizadorService } from '../_services/utilizador.service';
import {Utilizador} from '../utilizador';

import { ProfileComponent } from './profile.component';
import { EstadoHumor } from '../estado-humor';
import { componentFactoryName } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let userServiceSpy: jasmine.SpyObj<UtilizadorService>;
  let relationServiceSpy: jasmine.SpyObj<RelationService>;
  let estadoHumorServiceSpy: jasmine.SpyObj<EstadohumorService>;
  let tokenSpy: jasmine.SpyObj<TokenStorageService>;

  let spyUpdateUserDetails:any;

  let putUserServiceSpy;
  let tokenGetUserSpy;
  let getEstadoHumorByIDSpy;
  let fixture: ComponentFixture<ProfileComponent>;
  let currentUser:Utilizador={
    id: "123",
    nome: "TestSubject",
    email: "TestEmail",
    dataNascimento: new Date(),
    password: "password",
    avatar: "avatar",
    cidade: "city",
    pais: "pais",
    descricao: "description",
    numTelemovel: "telemovel",
    estadoHumorId: "111222",
    tags: ["nice"],
  };

  let estadoHumor:EstadoHumor={
    id:"123",
    nome: "Teste",
    icon: "Icon",
    descricaoEstadoHumor: "Descricao"
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports:[HttpClientModule, FormsModule, MatInputModule, MatNativeDateModule, MatDatepickerModule]
    })
    .compileComponents();
  });


  beforeEach(() => {

    
    userServiceSpy=jasmine.createSpyObj('UtilizadorService', ['putUtilizador']);
    estadoHumorServiceSpy=jasmine.createSpyObj('EstadohumorService', ['getEstadoHumorByID','putEstadoHumor']);
    relationServiceSpy=jasmine.createSpyObj('RelationService', ['']);
    tokenSpy=jasmine.createSpyObj('TokenStorageService', ['getUser']);

    getEstadoHumorByIDSpy=estadoHumorServiceSpy.getEstadoHumorByID.and.returnValue(of(estadoHumor));
    putUserServiceSpy=userServiceSpy.putUtilizador.and.returnValue(of(currentUser));
    tokenGetUserSpy=tokenSpy.getUser.and.returnValue(currentUser);


    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      declarations: [ ProfileComponent ],
      providers: [ { provide: UtilizadorService, useValue: userServiceSpy},{provide: RelationService, useValue: relationServiceSpy}, {prove: TokenStorageService, useValue: tokenSpy} ],
    });


    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user details', () => {
    
    component.currentUser=currentUser;
    
    currentUser.nome="Update Name";

    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');

    component.updateUserDetails();
    
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change email', () => {
    
    component.currentUser=currentUser;
    

    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="update email";
    component.changeEmail(value);
    
    expect(component.currentUser.email).toEqual(value);
    expect(component.clickEmailEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change password', () => {
    
    component.currentUser=currentUser;
    
    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="update password";
    component.changePassword(value);
    
    expect(component.currentUser.password).toEqual(value);
    expect(component.clickPasswordEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change data nascimento', () => {
    
    component.currentUser=currentUser;

    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');

    component.changeDataNascimento();

    expect(component.clickDataNascEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change telemovel', () => {
    
    component.currentUser=currentUser;
    
    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="update numTelemovel";
    component.changeNumTelemovel(value);
    
    expect(component.currentUser.numTelemovel).toEqual(value);
    expect(component.clickNumTelemEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change cidade', () => {
    
    component.currentUser=currentUser;
    
    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="update newCidade";
    component.changeCidade(value);
    
    expect(component.currentUser.cidade).toEqual(value);
    expect(component.clickCidadeEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change pais', () => {
    
    component.currentUser=currentUser;
    
    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="update newPais";
    component.changePais(value);
    
    expect(component.currentUser.pais).toEqual(value);
    expect(component.clickPaisEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change descricao', () => {
    
    component.currentUser=currentUser;
    
    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="update descricao";
    component.changeDescricao(value);
    
    expect(component.currentUser.descricao).toEqual(value);
    expect(component.clickDescricaoEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should change estado humor', () => {
    
    component.currentUser=currentUser;

    
    spyUpdateUserDetails= spyOn(component, 'updateUserDetails');


    var value:string="1234";
  
    var newEstadoHumor:EstadoHumor={
      id:"1234",
      nome:"Triste",
      icon:"Icon",
      descricaoEstadoHumor:"desc"
    }
    component.selectedEstadoHumor=newEstadoHumor;
    component.changeEstadoHumor();
    
    expect(component.currentUser.estadoHumorId).toEqual(value);
    expect(component.clickEstadoHumorEvent).toBeFalse();
    expect(spyUpdateUserDetails.calls.any()).toBeTrue();
    
    
  });

  it('should update clickEmailEvent', () => {
    
    component.onClickEmail();
    expect(component.clickEmailEvent).toBeTrue();
    
  });

  it('should update clickDataNascEvent', () => {
    
    component.onClickDataNascimento();
    expect(component.clickDataNascEvent).toBeTrue();
    
  });

  it('should update clickNumTelemEvent', () => {
    
    component.onClickNumTelemovel();
    expect(component.clickNumTelemEvent).toBeTrue();
    
  });

  it('should update clickPaisEvent', () => {
    
    component.onClickPais();
    expect(component.clickPaisEvent).toBeTrue();
    
  });

  it('should update clickCidadeEvent', () => {
    
    component.onClickCidade();
    expect(component.clickCidadeEvent).toBeTrue();
    
  });

  it('should update clickEstadoHumorEvent', () => {
    
    spyUpdateUserDetails= spyOn(component, 'getAllEstadosHumor');

    component.onClickEstadoHumor();
    expect(component.clickEstadoHumorEvent).toBeTrue();
    
  });

  it('should update clickDescricaoEvent', () => {
    
    component.onClickDescricao();
    expect(component.clickDescricaoEvent).toBeTrue();
    
  });

  it('should update clickPasswordEvent', () => {
    
    component.onClickPassword();
    expect(component.clickPasswordEvent).toBeTrue();
    
  });













});
