import { Repo } from "../../core/infra/Repo";
import { Comentario } from "../../domain/comentario/comentario";

export default interface IComentarioRepo extends Repo<Comentario> {
	save(comentario: Comentario): Promise<Comentario>;
	delete (id: string): Promise<boolean>;
	findById (id: string): Promise<Comentario>;
}