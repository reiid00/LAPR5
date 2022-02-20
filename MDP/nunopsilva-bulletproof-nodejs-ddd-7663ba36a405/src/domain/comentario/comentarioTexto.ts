import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ComentarioTextoProps {
  value: string;
}

export class ComentarioTexto extends ValueObject<ComentarioTextoProps> {
  get value(): string {
    return this.props.value;
  }
  
  private constructor (props: ComentarioTextoProps) {
    super(props);
  }

  public static create(texto: string): Result<ComentarioTexto> {
    
    const guardResult = Guard.againstNullOrUndefined(texto, 'texto');
    if (!guardResult.succeeded) {
      
      return Result.fail<ComentarioTexto>(guardResult.message);
    } else {
      return Result.ok<ComentarioTexto>(new ComentarioTexto({ value: texto }));
    }
  }
}