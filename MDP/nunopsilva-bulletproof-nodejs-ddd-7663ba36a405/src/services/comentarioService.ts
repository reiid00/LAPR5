import { Container, Service, Inject } from 'typedi';

import config from '../../config';

import IComentarioService from '../services/IServices/IComentarioService';
import { ComentarioMap } from "../mappers/ComentarioMap";
import { IComentarioDTO } from '../dto/IComentarioDTO';

import IPostRepo from './IRepos/IPostRepo';
import IComentarioRepo from './IRepos/IComentarioRepo';
import { PostMap } from "../mappers/PostMap";
import { IPostDTO } from '../dto/IPostDTO';

import { Post } from '../domain/post/post';

import { Comentario } from '../domain/comentario/comentario';


import { Result } from "../core/logic/Result";
import { ComentarioTexto } from '../domain/comentario/comentarioTexto';
import IPostService from './IServices/IPostService';

@Service()
export default class ComentarioService implements IComentarioService{
  constructor(
      @Inject(config.repos.post.name) private postRepo : IPostRepo,
      @Inject(config.repos.comentario.name) private comentarioRepo : IComentarioRepo,
      @Inject(config.services.post.name) private postService : IPostService,
  ) {}


  public async getComentario( comentarioId: string): Promise<Result<IComentarioDTO>> {
    try {
      const comentario = await this.comentarioRepo.findById(comentarioId);

      if (comentario === null) {
        return Result.fail<IComentarioDTO>("Comentario not found");
      }
      else {
        const comentarioDTOResult = ComentarioMap.toDTO( comentario ) as IComentarioDTO;
        return Result.ok<IComentarioDTO>( comentarioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  async delete(comentarioId: string): Promise<boolean> {
    return ( await this.comentarioRepo.delete(comentarioId) == null ? false:true);
  }

  public async createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
    try {
      let post: Post;


    const texto = await ComentarioTexto.create( comentarioDTO.texto ).getValue();

      const comentarioOrError = await Comentario.create({
        texto: texto,
        tags: comentarioDTO.tags,
        post: comentarioDTO.post,
        autorId: comentarioDTO.autorId
      });

      if (comentarioOrError.isFailure) {
        throw Result.fail<IComentarioDTO>(comentarioOrError.errorValue());
      }

      const comentarioResult = comentarioOrError.getValue();


      await this.comentarioRepo.save(comentarioResult);

      await this.updatePost(comentarioResult);

      const comentarioDTOResult = ComentarioMap.toDTO( comentarioResult ) as IComentarioDTO;
      return Result.ok<IComentarioDTO>( comentarioDTOResult );
    } catch (e) {
      throw e;
    }
  }

  public async updateComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
    try {
      const comentario = await this.comentarioRepo.findById((await ComentarioMap.toDomain(comentarioDTO)).id.toString());

      if (comentario === null) {
        return Result.fail<IComentarioDTO>("Comentario not found");
      }
      else {

        
        comentario.post = comentarioDTO.post;

        for(var i = 0, len = comentarioDTO.tags.length; i < len; ++i) {
          comentario.tags[i] = comentarioDTO.tags.at(i);
        }

        comentario.texto = await ComentarioTexto.create(comentarioDTO.texto).getValue();
        await this.comentarioRepo.save(comentario);

        const comentarioDTOResult = ComentarioMap.toDTO( comentario ) as IComentarioDTO;
        return Result.ok<IComentarioDTO>( comentarioDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  private async getPost (postId: string): Promise<Result<Post>> {

    const post = await this.postRepo.findById( postId );
    const found = !!post;

    if (found) {
      return Result.ok<Post>(post);
    } else {
      return Result.fail<Post>("Couldn't find post by id=" + postId);
    }
  }

  private async updatePost (comentario: Comentario): Promise<Result<Post>> {

    const post = await this.postRepo.findById(comentario.post);
    const found = !!post;

    if (found) {
      post.comentarios.push(comentario.id.toString());
      const postDTOResult = PostMap.toDTO( post ) as IPostDTO;
      this.postService.updatePostWithId(postDTOResult,comentario.post);
      return Result.ok<Post>(post);
    } else {
      return Result.fail<Post>("Couldn't find post by id=" + comentario.post);
    }
  }

}