import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilizadorService } from '../_services/utilizador.service';

@Component({
  selector: 'app-user-search-list',
  templateUrl: './user-search-list.component.html',
  styleUrls: ['./user-search-list.component.css']
})
@Injectable({
  providedIn: 'root'
})

export class UserSearchListComponent implements OnInit {

  constructor(private http:HttpClient, private utilizadorService: UtilizadorService) { }

  public users;

  getUser(){
    this.utilizadorService.getUtilizadores().subscribe(users=>this.users=users);
  }
  ngOnInit() {
    this.getUser();
  }

  add(){
    //fazer alguma cena//
    window.alert('Pedido enviado');
  }

}
