import  ComentarioService  from '../../../src/services/comentarioService';
import  {Comentario} from '../../../src/domain/comentario/comentario';
import * as jasmine from 'jasmine-core';
import { expect } from 'chai';
import { ComentarioTexto } from '../../../src/domain/comentario/comentarioTexto';

describe('Comentario', () => {

  interface ComentarioProps {
    texto: ComentarioTexto;
    post: string;
    tags: string[];
    autorId: string;
  }
 

  it('can create a comentario', () => {
    let comentarioProps:ComentarioProps={
        texto: ComentarioTexto.create("comentario teste").getValue(),
        post: "id posts teste",
        tags: ['tag teste', 'teste tag 2'],
        autorId: 'autor id teste'
    };

    let comentario:Comentario = Comentario.create(comentarioProps).getValue();

    expect(comentario.texto).to.equal(comentarioProps.texto);
    expect(comentario.post).to.equal(comentarioProps.post);
    expect(comentario.tags).to.equal(comentarioProps.tags);
    expect(comentario.autorId).to.equal(comentarioProps.autorId);
  });

});