import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Utilizador } from 'src/app/utilizador';
import { PostsService } from 'src/app/_services/posts.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private token: TokenStorageService,private postService: PostsService) { 
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

  onPostClick(postInput: HTMLTextAreaElement,tagInput: HTMLTextAreaElement) {

    this.texto = postInput.value;
    let tags = tagInput.value;
    var array = tags.split(',');
    this.postService.postPost(this.texto,array,this.currentUser.id.toString()).subscribe(response=>{
      if(this.texto!='')
        this.submitted = true;
      response;
    });
    
    
 }

}
