import { Result } from "../../core/logic/Result";
import { IComentarioDTO } from "../../dto/IComentarioDTO";

export default interface IPostService  {
    createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    updateComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    
    delete (comentarioId: string): Promise<boolean>;
    getComentario (comentarioId: string): Promise<Result<IComentarioDTO>>;
}