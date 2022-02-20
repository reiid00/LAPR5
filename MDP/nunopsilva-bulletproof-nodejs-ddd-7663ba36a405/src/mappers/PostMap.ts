import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IPostDTO} from "../dto/IPostDTO";

import { Post } from "../domain/post/post";
import { Comentario } from "../domain/comentario/comentario";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import ComentarioRepo from "../repos/comentarioRepo";

import { forEach } from 'lodash';
import { PostTexto } from '../domain/post/postTexto';
import postSchema from '../persistence/schemas/postSchema';

export class PostMap extends Mapper<Post> {

  public static toDTO( post: Post): IPostDTO {
    
    let temp_comentarios = [] as string[];
    
   

    for(var i=0,len=post.comentarios.length;i<len;i++){
        temp_comentarios[i]=post.comentarios[i];
    }
    
    return {
      id: post.id.toString(),
      texto: post.texto.value,
      comentarios: temp_comentarios,
      tags: post.tags,
      likes:post.likes,
      dislikes:post.dislikes,
      autorId: post.autorId,
      likesUsers: post.likesUsers,
      dislikesUsers: post.dislikesUsers
    } as IPostDTO;
  }

  public static async toDomain (raw: any): Promise<Post> {

    const comentarioRepo = Container.get(ComentarioRepo);

    let temp_comentarios = [] as Comentario[];
    


    let temp_likes = raw.likes;

    let temp_dislikes = raw.dislikes;
    
    const textoOrError = PostTexto.create(raw.texto);


    const postOrError = Post.create({
      texto: textoOrError.getValue(),
      tags: raw.tags,
      comentarios: raw.comentarios,
      likes: temp_likes,
      dislikes: temp_dislikes,
      autorId: raw.autorId,
      likesUsers: raw.likesUsers,
      dislikesUsers: raw.dislikesUsers
    }, new UniqueEntityID(raw.domainId))



    postOrError.isFailure ? console.log(postOrError.error) : '';
    
    return postOrError.isSuccess ? postOrError.getValue() : null;
  }

  public static toPersistence (post: Post): any {

    let temp_comentarios = [] as string[];
    for(var j = 0, len = post.comentarios.length; j < len; ++j) {
      if(post.comentarios.at(j)!=undefined)
      temp_comentarios[j] = post.comentarios.at(j);
    }
    const a = {
      domainId: post.id.toString(),
      texto: post.texto.value,
      tags: post.tags,
      comentarios: temp_comentarios,
      likes: post.likes,
      dislikes: post.dislikes,
      autorId: post.autorId,
      likesUsers: post.likesUsers,
      dislikesUsers: post.dislikesUsers
    }
    
    return a;
  }
}