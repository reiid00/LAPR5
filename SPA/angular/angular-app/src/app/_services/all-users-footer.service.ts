import { Injectable } from '@angular/core';
import { UtilizadorService } from './utilizador.service';
import { Utilizador } from '../utilizador';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllUsersFooterService {

  constructor(private UtilizadorService:UtilizadorService) { }

  utilizadores: Utilizador[] = [];
  



  async getUtilizadores() {

    await this.fillArray();
    console.log(this.utilizadores)
  }

   async fillArray(){
    const utilizadores$ = this.UtilizadorService.getUtilizadores().pipe(map(response=>response));
     this.utilizadores= await firstValueFrom(utilizadores$);
  }

}
