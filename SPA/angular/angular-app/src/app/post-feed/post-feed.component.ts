import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { Observable, of } from 'rxjs';
import { Post } from '../post';
import { CreatePostComponent } from '../tools/create-post/create-post.component';
import { SearchPostsFeedComponent } from '../tools/search-posts-feed/search-posts-feed.component';
import { CreateComentarioComponent } from '../tools/create-comentario/create-comentario.component';
import { Utilizador } from '../utilizador';
import { UtilizadorService } from '../_services/utilizador.service';
import { PostsService } from '../_services/posts.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ViewComentariosComponent } from '../tools/view-comentarios/view-comentarios.component';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  displayedColumns: string[] = ['texto', 'tags', 'action'];
  dataSource: Post[] = [
  ];
  new_data : any;
  user:Utilizador;
  //comentCount:number[]=[];
  currentUser: Utilizador;

  constructor(private userService: UtilizadorService,private dialog: MatDialog,private postsService:PostsService,private token: TokenStorageService) {
    this.currentUser = this.token.getUser();
   }

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  ngOnInit(): void {
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }

  async onSearchFeedClick(){
    let dialogRef=await this.dialog.open(SearchPostsFeedComponent);
    dialogRef.afterClosed().subscribe(result => {
    this.new_data=result.data;
    this.dataSource=result.data;
    console.log('new data',this.new_data);
    console.log('dataSource',this.dataSource);
    this.userService.getUtilizadorByID(this.dataSource[0].autorId.toString()).subscribe(user=>{

      this.user=user
      console.log('user: ',user);
     });
    });
  }

  async onCreateComentarioClick(id){
    let dialogRef=await this.dialog.open(CreateComentarioComponent, {
      data: {
          dataKey: id
      }
   });
  }

  async onLikeClick(post:Post){
    if(!post.likesUsers.includes(this.currentUser.id) && !post.dislikesUsers.includes(this.currentUser.id))
      post.likesUsers.push(this.currentUser.id);
    else{
      if(post.dislikesUsers.includes(this.currentUser.id)){
        post.dislikesUsers.pop();
        post.likesUsers.push(this.currentUser.id);
      }
    }
      post.dislikes=post.dislikesUsers.length;
      post.likes=post.likesUsers.length;
      await this.postsService.putPost(post.id,post.texto,post.tags,post.comentarios,post.likes,post.dislikes,post.autorId,post.likesUsers,post.dislikesUsers).subscribe(response=>response);
  }

  async onDislikeClick(post:Post){
    if(!post.likesUsers.includes(this.currentUser.id) && !post.dislikesUsers.includes(this.currentUser.id))
        post.dislikesUsers.push(this.currentUser.id);
    else{
        if(post.likesUsers.includes(this.currentUser.id)){
          post.likesUsers.pop();
          post.dislikesUsers.push(this.currentUser.id);
        }
      }
    post.likes=post.likesUsers.length;
    post.dislikes=post.dislikesUsers.length;
    await this.postsService.putPost(post.id,post.texto,post.tags,post.comentarios,post.likes,post.dislikes,post.autorId,post.likesUsers,post.dislikesUsers).subscribe(response=>response);
}

async onViewComentarioClick(post:Post){
  let dialogRef=await this.dialog.open(ViewComentariosComponent, {
    data: {
        dataKey: post.comentarios
    }
 });
}

  update(){
    console.log(this.dataSource);
  }

}
