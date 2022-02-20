import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { ComentarioId } from "./comentarioId";
import { ComentarioTexto } from "./comentarioTexto";
import { Post } from "../post/post";
import { Guard } from "../../core/logic/Guard";


interface ComentarioProps {
  texto: ComentarioTexto;
  post: string;
  tags: string[];
  autorId: string;
}

export class Comentario extends AggregateRoot<ComentarioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get comentarioId (): ComentarioId {
    return ComentarioId.caller(this.id);
  }

  get texto (): ComentarioTexto {
    return this.props.texto;
  }

  set texto (value: ComentarioTexto) {
    this.props.texto = value;
}


  get post (): string {
    return this.props.post;
  }
  
  set post (value: string) {
      this.props.post = value;
  }

  get tags (): string[] {
    return this.props.tags;
  }
  
  set tags (value: string[]) {
      this.props.tags = value;
  }

  get autorId (): string {
    return this.props.autorId;
  }
  
  set autorId (value: string) {
      this.props.autorId = value;
  }

  private constructor (props: ComentarioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ComentarioProps, id?: UniqueEntityID): Result<Comentario> {

    const guardedProps = [
      { argument: props.texto, argumentName: 'texto' },
      { argument: props.post, argumentName: 'post' },
      { argument: props.tags, argumentName: 'tags' },
      { argument: props.autorId, argumentName: 'autorId' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Comentario>(guardResult.message);
    }     
    else {
      const comentario = new Comentario({
        ...props
      }, id);

      return Result.ok<Comentario>(comentario);
    }
  }
}