import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/post/post";
import { PostId } from "../domain/post/postId";
import { PostMap } from "../mappers/PostMap";
import postSchema from '../persistence/schemas/postSchema';

@Service()
export default class PostRepo implements IPostRepo {
  private models: any;

  constructor(
    @Inject('postSchema') private postSchema : Model<IPostPersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (postId: PostId | string): Promise<boolean> {

    const idX = postId instanceof PostId ? (<PostId>postId).id.toValue() : postId;

    const query = { domainId: idX}; 
    const postDocument = await this.postSchema.findOne( query as FilterQuery<IPostPersistence & Document> );

    return !!postDocument === true;
  }

  public async delete (postId: PostId | string): Promise<boolean> {

    const idX = postId instanceof PostId ? (<PostId>postId).id.toValue() : postId;

    const query = { domainId: idX}; 
    const postDocument = await this.postSchema.deleteOne( query as FilterQuery<IPostPersistence & Document> );

    return !!postDocument === true;
  }

  public async save (post: Post): Promise<Post> {
    const query = { domainId: post.id.toString() }; 

    const postDocument = await this.postSchema.findOne( query );

    try {
      if (postDocument === null ) {
        const rawPost: any = PostMap.toPersistence(post);

        const postCreated = await this.postSchema.create(rawPost);
        
        return PostMap.toDomain(postCreated);
      } else {
      
        await postDocument.save();

        return post;
      }
    } catch (err) {
    
      throw err;
    }
  }

  public async update (post: Post): Promise<Post> {
    const query = { domainId: post.id.toString() }; 

    const postDocument = await this.postSchema.findOne( query );

    for(var i = 0, len = post.comentarios.length; i < len; ++i) {
      if(!postDocument.comentarios.includes(post.comentarios.at(i)))
        postDocument.comentarios.push(post.comentarios.at(i));
    }

    for(var j = 0, len = post.likesUsers.length; j < len; ++j) {
      
      if(!postDocument.likesUsers.includes(post.likesUsers.at(j)) && !postDocument.dislikesUsers.includes(post.likesUsers.at(j)))
        postDocument.likesUsers.push(post.likesUsers.at(j));
    }

    postDocument.likes=postDocument.likesUsers.length;

    for(var k = 0, len = post.dislikesUsers.length; k < len; ++k) {
      if(!postDocument.likesUsers.includes(post.dislikesUsers.at(k)) && !postDocument.dislikesUsers.includes(post.dislikesUsers.at(k)))
        postDocument.dislikesUsers.push(post.dislikesUsers.at(k));
    }


    postDocument.dislikes=postDocument.dislikesUsers.length;


    try {
      if (postDocument === null ) {
        const rawPost: any = PostMap.toPersistence(post);

        const postCreated = await this.postSchema.create(rawPost);
        
        return PostMap.toDomain(postCreated);
      } else {
      
        await postDocument.save();

        return post;
      }
    } catch (err) {
     
      throw err;
    }
  }
  
  public async findById (postId: PostId | string): Promise<Post> {

    const idX = postId instanceof PostId ? (<PostId>postId).id.toValue() : postId;

    const query = { domainId: idX }; 
    const postRecord = await this.postSchema.findOne( query as FilterQuery<IPostPersistence & Document> );

    if( postRecord != null) {
      return PostMap.toDomain(postRecord);
    }
    else
      return null;
  }

  public async findAllByAutorId (postAutorId: string): Promise<Post[]> {

    const query = { autorId: postAutorId }; 
    const postsRecord = await this.postSchema.find( query as FilterQuery<IPostPersistence & Document> );
    let temp_posts: Post[]=[];
    if( postsRecord != null) {
      for(var i = 0, len = postsRecord.length; i < len; ++i) {
        temp_posts.push( await PostMap.toDomain(postsRecord.at(i)));
      }

      return temp_posts;
    }
    else
      return null;
  }
}