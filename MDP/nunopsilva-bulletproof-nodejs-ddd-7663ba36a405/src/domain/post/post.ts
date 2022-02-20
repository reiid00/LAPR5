import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { PostId } from "./postId";
import { PostTexto } from "./postTexto";
import { Comentario } from "../comentario/comentario";
import { Guard } from "../../core/logic/Guard";


interface PostProps {
  texto: PostTexto;
  comentarios: string[];
  tags: string[];
  likes: number;
  dislikes: number;
  autorId: string;
  likesUsers: string[];
  dislikesUsers: string[];

}

export class Post extends AggregateRoot<PostProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get postId (): PostId {
    return PostId.caller(this.id)
  }

  get texto (): PostTexto {
    return this.props.texto;
  }

  set texto (value: PostTexto) {
    this.props.texto = value;
}

  get comentarios (): string[] {
    return this.props.comentarios;
  }
  
  set comentarios (value: string[]) {
      this.props.comentarios = value;
  }

  get tags (): string[] {
    return this.props.tags;
  }
  
  set tags (value: string[]) {
      this.props.tags = value;
  }

  get likes (): number {
    return this.props.likes;
  }
  
  set likes (value: number) {
      this.props.likes = value;
  }

  get dislikes (): number {
    return this.props.dislikes;
  }
  
  set dislikes (value: number) {
      this.props.dislikes = value;
  }

  get autorId (): string {
    return this.props.autorId;
  }
  
  set autorId (value: string) {
      this.props.autorId = value;
  }

  get likesUsers (): string[] {
    return this.props.likesUsers;
  }
  
  set likesUsers (value: string[]) {
      this.props.likesUsers = value;
  }

  get dislikesUsers (): string[] {
    return this.props.dislikesUsers;
  }
  
  set dislikesUsers (value: string[]) {
      this.props.dislikesUsers = value;
  }

  private constructor (props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PostProps, id?: UniqueEntityID): Result<Post> {

    const guardedProps = [
      { argument: props.texto, argumentName: 'texto' },
      { argument: props.comentarios, argumentName: 'comentarios' },
      { argument: props.tags, argumentName: 'tags' },
      { argument: props.likes, argumentName: 'likes' },
      { argument: props.dislikes, argumentName: 'dislikes' },
      { argument: props.autorId, argumentName: 'autorId' },
      { argument: props.likesUsers, argumentName: 'likesUsers' },
      { argument: props.dislikesUsers, argumentName: 'dislikesUsers' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message);
    }     
    else {
      const post = new Post({
        ...props
      }, id);

      return Result.ok<Post>(post);
    }
  }
}