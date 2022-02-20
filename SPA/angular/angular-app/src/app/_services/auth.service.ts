import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilizadorService } from './utilizador.service';
import { Utilizador } from '../utilizador';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private UtilizadorService:UtilizadorService) { }

  login(email: string, password: string): Observable<Utilizador> {
    return this.UtilizadorService.getUtilizadorByEmail(email,password);
  }

  register(nome: string, email:string, dataNascimento:Date,password:string,
    avatar:string,cidade:string,pais:string,descricao:string,numTelemovel:string,
    estadoHumorId: string,Tags: [string]): Observable<Utilizador> {
      return this.UtilizadorService.postUtilizador(nome, email, dataNascimento,password,
        avatar,cidade,pais,descricao,numTelemovel,
        estadoHumorId,Tags);
  }
}