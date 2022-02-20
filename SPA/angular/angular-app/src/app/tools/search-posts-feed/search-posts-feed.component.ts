import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Utilizador } from '../../utilizador';
import { Post } from '../../post';
import {HttpClient} from '@angular/common/http';
import { UtilizadorService } from '../../_services/utilizador.service';
import { PostsService } from '../../_services/posts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-search-posts-feed',
  templateUrl: './search-posts-feed.component.html',
  styleUrls: ['./search-posts-feed.component.css']
})
export class SearchPostsFeedComponent implements OnInit {

  constructor(private http:HttpClient, private userService: UtilizadorService, private postService: PostsService,
    public dialogRef: MatDialogRef<SearchPostsFeedComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Post[]) {
     
     }
  /** list of users */
  public users;
  public posts;
  array_posts:Post[]=[];
  local_data:any;
  title= "Search for users Feed"
  searchText;
  action:string;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUtilizadores().subscribe(users=>this.users=users);
  }

  onSearchFeedClick(userId) {

    this.postService.getPostsByAutorId(userId).subscribe(posts=>{
      this.posts=posts
      console.log('posts: ',posts);
      for (let i = 0; i < this.posts.length; i++) {
        this.array_posts.push(this.posts[i]);
       }
    }
      );

    this.dialogRef.close({event:this.action,data:this.array_posts});
 }

}
