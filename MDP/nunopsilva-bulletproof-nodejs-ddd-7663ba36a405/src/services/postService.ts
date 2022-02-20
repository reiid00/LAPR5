import { Container, Service, Inject } from 'typedi';

import config from '../../config';

import IPostService from '../services/IServices/IPostService';
import { PostMap } from "../mappers/PostMap";
import { IPostDTO } from '../dto/IPostDTO';

import IPostRepo from './IRepos/IPostRepo';
import IComentarioRepo from './IRepos/IComentarioRepo';

import { Post } from '../domain/post/post';

import { Comentario } from '../domain/comentario/comentario';

import { Result } from "../core/logic/Result";
import { PostTexto } from '../domain/post/postTexto';

@Service()
export default class PostService implements IPostService{
  constructor(
      @Inject(config.repos.comentario.name) private comentarioRepo : IComentarioRepo,
      @Inject(config.repos.post.name) private postRepo : IPostRepo,
  ) {}


  async getPostsByAutorId(postAutorId: string): Promise<Result<IPostDTO[]>> {
    try {
      const post = await this.postRepo.findAllByAutorId(postAutorId);

      if (post === null) {
        return Result.fail<IPostDTO[]>("None post from this author found");
      }
      else {
        let postDTOResult:IPostDTO[]=[];
        for(var i = 0, len = post.length; i < len; ++i) {
         
           postDTOResult.push( PostMap.toDTO( post.at(i) ) as IPostDTO);
        }
           

        return Result.ok<IPostDTO[]>( postDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  async delete(postId: string): Promise<boolean> {
    return ( await this.postRepo.delete(postId) == null ? false:true);
  }


  public async getPost( postId: string): Promise<Result<IPostDTO>> {
    try {
      const post = await this.postRepo.findById(postId);

      if (post === null) {
        return Result.fail<IPostDTO>("Post not found");
      }
      else {
        const postDTOResult = PostMap.toDTO( post ) as IPostDTO;
        return Result.ok<IPostDTO>( postDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
    try {
      let comentarios: string[]=[];
      let likes: number=0;
      let dislikes: number=0;

    if( postDTO.comentarios!=undefined){
    for(var i = 0, len = postDTO.comentarios.length; i < len; ++i) {
        comentarios.push(postDTO.comentarios[i]);
      }
  }

    if(postDTO.likes!=null)
      likes=postDTO.likes;

    if(postDTO.dislikes!=null)
      dislikes=postDTO.dislikes;
      

    const texto = await PostTexto.create( postDTO.texto ).getValue();

      const postOrError = await Post.create({
        texto: texto,
        tags: postDTO.tags,
        comentarios: comentarios,
        likes: likes,
        dislikes: dislikes,
        autorId: postDTO.autorId,
        likesUsers: postDTO.likesUsers,
        dislikesUsers: postDTO.dislikesUsers,
      });
     

      if (postOrError.isFailure) {
        throw Result.fail<IPostDTO>(postOrError.errorValue());
      }

      const postResult = postOrError.getValue();

      await this.postRepo.save(postResult);

      const postDTOResult = PostMap.toDTO( postResult ) as IPostDTO;
      return Result.ok<IPostDTO>( postDTOResult );
    } catch (e) {
      throw e;
    }
  }

  public async updatePost(postDTO: IPostDTO,idPost:string): Promise<Result<IPostDTO>> {
    try {
      
      const post = await this.postRepo.findById(idPost);

 
      if (post === null) {
        return Result.fail<IPostDTO>("Post not found");
      }
      else {

        for(var i = 0, len = postDTO.comentarios.length; i < len; ++i) {
          post.comentarios[i] =  postDTO.comentarios.at(i);
        }

        for(var i = 0, len = postDTO.tags.length; i < len; ++i) {
          post.tags[i] = postDTO.tags.at(i);
        }

        for(var i = 0, len = postDTO.likesUsers.length; i < len; ++i) {
          post.likesUsers.push(postDTO.likesUsers.at(i));
        }

        for(var i = 0, len = postDTO.dislikesUsers.length; i < len; ++i) {
          post.dislikesUsers.push(postDTO.dislikesUsers.at(i));
        }

        post.texto = await PostTexto.create(postDTO.texto).getValue();
        await this.postRepo.update(post);

        const postDTOResult = PostMap.toDTO( post ) as IPostDTO;
        return Result.ok<IPostDTO>( postDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async updatePostWithId(postDTO: IPostDTO,idPost:string): Promise<Result<IPostDTO>> {
    try {
      
      const post = await this.postRepo.findById(idPost);

      if (post === null) {

        return Result.fail<IPostDTO>("Post not found");
      }
      else {

        for(var i = 0, len = postDTO.comentarios.length; i < len; ++i) {
          post.comentarios[i] =  postDTO.comentarios.at(i);
         
        }

        for(var i = 0, len = postDTO.tags.length; i < len; ++i) {
          post.tags[i] = postDTO.tags.at(i);
        }

       

        post.texto = await PostTexto.create(postDTO.texto).getValue();
        await this.postRepo.update(post);

        
        const postDTOResult = PostMap.toDTO( post ) as IPostDTO;
        return Result.ok<IPostDTO>( postDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  private async getComentario (comentarioId: string): Promise<Result<Comentario>> {

    const comentario = await this.comentarioRepo.findById( comentarioId );
    const found = !!comentario;

    if (found) {
      return Result.ok<Comentario>(comentario);
    } else {
      return Result.fail<Comentario>("Couldn't find post by id=" + comentarioId);
    }
  }

}
