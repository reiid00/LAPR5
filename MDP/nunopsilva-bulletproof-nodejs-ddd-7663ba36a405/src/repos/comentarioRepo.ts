import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IComentarioPersistence } from '../dataschema/IComentarioPersistence';

import IComentarioRepo from "../services/IRepos/IComentarioRepo";
import { Comentario } from "../domain/comentario/comentario";
import { ComentarioId } from "../domain/comentario/comentarioId";
import { ComentarioMap } from "../mappers/ComentarioMap";

@Service()
export default class ComentarioRepo implements IComentarioRepo {
  private models: any;

  constructor(
    @Inject('comentarioSchema') private comentarioSchema : Model<IComentarioPersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (comentarioId: ComentarioId | string): Promise<boolean> {

    const idX = comentarioId instanceof ComentarioId ? (<ComentarioId>comentarioId).id.toValue() : comentarioId;

    const query = { domainId: idX}; 
    const comentarioDocument = await this.comentarioSchema.findOne( query as FilterQuery<IComentarioPersistence & Document> );

    return !!comentarioDocument === true;
  }

  public async save (comentario: Comentario): Promise<Comentario> {
    const query = { domainId: comentario.id.toString() }; 

    const comentarioDocument = await this.comentarioSchema.findOne( query );

    try {
      if (comentarioDocument === null ) {
        const rawComentario: any = ComentarioMap.toPersistence(comentario);

        const comentarioCreated = await this.comentarioSchema.create(rawComentario);

        return ComentarioMap.toDomain(comentarioCreated);
      } else {
        await comentarioDocument.save();

        return comentario;
      }
    } catch (err) {
      throw err;
    }
  }

  public async delete (comentarioId: ComentarioId | string): Promise<boolean> {

    const idX = comentarioId instanceof ComentarioId ? (<ComentarioId>comentarioId).id.toValue() : comentarioId;

    const query = { domainId: idX}; 
    const comentarioDocument = await this.comentarioSchema.deleteOne( query as FilterQuery<IComentarioPersistence & Document> );

    return !!comentarioDocument === true;
  }
  
  public async findById (comentarioId: ComentarioId | string): Promise<Comentario> {

    const idX = comentarioId instanceof ComentarioId ? (<ComentarioId>comentarioId).id.toValue() : comentarioId;

    const query = { domainId: idX }; 
    const comentarioRecord = await this.comentarioSchema.findOne( query as FilterQuery<IComentarioPersistence & Document> );

    if( comentarioRecord != null) {
      return ComentarioMap.toDomain(comentarioRecord);
    }
    else
      return null;
  }
}