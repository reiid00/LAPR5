import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IComentarioDTO} from "../dto/IComentarioDTO";

import { Post } from "../domain/post/post";
import { Comentario } from "../domain/comentario/comentario";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import PostRepo from "../repos/postRepo";

import { forEach } from 'lodash';
import { ComentarioTexto } from '../domain/comentario/comentarioTexto';

export class ComentarioMap extends Mapper<Comentario> {

  public static toDTO( comentario: Comentario): IComentarioDTO {
    
    let temp_post:string;
    

    
        temp_post=comentario.post;

    return {
      texto: comentario.texto.value,
      post: temp_post,
      tags: comentario.tags,
      autorId: comentario.autorId
    } as IComentarioDTO;
  }

  public static async toDomain (raw: any): Promise<Comentario> {

    const postRepo = Container.get(PostRepo);


    const textoOrError = ComentarioTexto.create(raw.texto);

    const comentarioOrError = Comentario.create({
      texto: textoOrError.getValue(),
      tags: raw.tags,
      post: raw.post,
      autorId: raw.autorId
    }, new UniqueEntityID(raw.domainId))

    comentarioOrError.isFailure ? console.log(comentarioOrError.error) : '';
    
    return comentarioOrError.isSuccess ? comentarioOrError.getValue() : null;
  }

  public static toPersistence (comentario: Comentario): any {
    const a = {
      domainId: comentario.id.toString(),
      texto: comentario.texto.value,
      tags: comentario.tags,
      post: comentario.post,
      autorId: comentario.autorId
    }
    return a;
  }
}