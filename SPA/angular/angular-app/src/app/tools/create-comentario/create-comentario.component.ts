import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utilizador } from 'src/app/utilizador';
import { ComentariosService } from 'src/app/_services/comentarios.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-create-comentario',
  templateUrl: './create-comentario.component.html',
  styleUrls: ['./create-comentario.component.css']
})
export class CreateComentarioComponent implements OnInit {

  constructor(private token: TokenStorageService,private comentarioService: ComentariosService,
    @Inject(MAT_DIALOG_DATA) public data: any ) { 
    this.currentUser = this.token.getUser();
  }

  submitted:boolean = false;

  currentUser: Utilizador;
  texto: string;

  ngOnInit(): void {
  }

  onSubmit() { 
    if(this.texto!='')
      this.submitted = true;

   }

  onComentarioClick(commentaryInput: HTMLTextAreaElement,tagInput: HTMLTextAreaElement) {

    this.texto = commentaryInput.value;
    let tags = tagInput.value;
    var array = tags.split(',');
    console.log(this.data.dataKey);
    this.comentarioService.postComentario(this.texto,array,this.data.dataKey,this.currentUser.id.toString()).subscribe(response=>{
      if(this.texto!='')
        this.submitted = true;
      response;
    });
    
    
 }
}
