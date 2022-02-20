import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comentario } from 'src/app/comentario';
import { Post } from 'src/app/post';
import { Utilizador } from 'src/app/utilizador';
import { ComentariosService } from 'src/app/_services/comentarios.service';
import { UtilizadorService } from 'src/app/_services/utilizador.service';

@Component({
  selector: 'app-view-comentarios',
  templateUrl: './view-comentarios.component.html',
  styleUrls: ['./view-comentarios.component.css']
})
export class ViewComentariosComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private comentarioService: ComentariosService,private utilizadorService: UtilizadorService) { }

  comentarios:Comentario[]=[];
  utilizadores:Utilizador[]=[];
  
  async ngOnInit(): Promise<void> {
    
    for (let i = 0, len=this.data.dataKey.length; i < len; i++) {
     
    await this.comentarioService.getComentarioById(this.data.dataKey[i]).subscribe(response=>{      
      this.comentarios[i]=response;
      this.utilizadorService.getUtilizadorByID( this.comentarios[i].autorId).subscribe(resp=>{
        this.utilizadores[i]=resp
      });
      
    });
  }
  }

}
