import { Injectable } from '@angular/core';
import { RelationService } from '../relation.service';
import { UtilizadorService } from './utilizador.service';
import { Relation } from '../relation';
import { Utilizador } from '../utilizador';

@Injectable({
  providedIn: 'root'
})
export class UserNewConexionsService {

  constructor( ) {}


  private newFriends:Utilizador[] = new Array();
  private user:Utilizador;
  private suggestedFriends:Utilizador[] = new Array();
  private tagsSuggestedFriends:number[] = new Array();
  private friendsService:[Relation];
  private allUsers:[Utilizador];

  public newConexions(user1 : Utilizador,friendsFromService:[Relation],users:[Utilizador]):Utilizador[]
  {
    this.user = user1;
    this.friendsService = friendsFromService;
    this.allUsers = users;
    this.calculateConexions();

    console.log(this.newFriends.length);
    return this.newFriends;
  }

  private calculateConexions()
  {
    let friendsId:string[] = new Array();
    for (var i = 0; i < this.friendsService.length;i++)
    {
      console.log("friend ID: " + this.friendsService[i].userID2);
      friendsId.push(this.friendsService[i].userID2);
    }

    for (var i = 0; i<this.allUsers.length;i++)
    {
      if(this.verifyIfNotFriends(this.allUsers[i].id,friendsId)){
        if(this.allUsers[i].id != this.user.id)
        {
          console.log("new friend" + this.allUsers[i].nome);
            this.newFriends.push(this.allUsers[i]);
        }
      }
    }
    this.suggestFriends();
  }

  private verifyIfNotFriends(id:string,listFriends:string[]):boolean
  {
    for(var i = 0; i< listFriends.length;i++)
    {
      if(listFriends[i] == id)
      {
        return false;
      }
    }
    return true;
  }

  private suggestFriends()
  {
    for(var i = 0; i< this.newFriends.length;i++)
    {
      this.tagsSuggestedFriends.push(this.returnTagsInCommonNum(this.user,this.newFriends[i]));
    }

    this.putMatrixesInOrder();

  }

  private putMatrixesInOrder()
  {
    for (var i = 1; i < this.tagsSuggestedFriends.length; i++)
    {
      for (var j = 0; j < i; j++)
      {
        if (this.tagsSuggestedFriends[j] < this.tagsSuggestedFriends[i]) {
          var x = this.tagsSuggestedFriends[i];
          this.tagsSuggestedFriends[i] = this.tagsSuggestedFriends[j];
          this.tagsSuggestedFriends[j] = x;

          var k = this.newFriends[i];
          this.newFriends[i] = this.newFriends[j];
          this.newFriends[j] = k;
        }

      }
    }
  }

  private returnTagsInCommonNum(user:Utilizador,newFriend:Utilizador):number
  {
    var k = 0;
    for(var i = 0; i < user.tags.length;i++)
    {
      if(newFriend.tags.includes(user.tags[i]))
        k++;
    }

    return k;
  }

  public returnTagsInCommon(user:Utilizador,newFriend:Utilizador):string[]
  {
    var tags:string[] = new Array();
    for(var i = 0; i < user.tags.length;i++)
    {
      if(newFriend.tags.includes(user.tags[i]))
        tags.push(user.tags[i]);
    }
    return tags;
  }


}
