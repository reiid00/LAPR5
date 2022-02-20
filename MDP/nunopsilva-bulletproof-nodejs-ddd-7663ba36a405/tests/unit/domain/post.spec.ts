import { expect } from 'chai';
import { PostTexto } from '../../../src/domain/post/postTexto';
import { Post } from '../../../src/domain/post/post';

describe('Test Post Domain', () => {
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

  it('can create a post', () => {

    //var texto=PostTexto.create()

    var postProps:PostProps={
        texto: PostTexto.create("Hello there").getValue(),
        comentarios: ["Comentario"],
        tags: ["musica"],
        likes:10,
        dislikes:15,
        autorId: "12dew",
        likesUsers: ["user1"],
        dislikesUsers:["user2"]
    };

    var post=Post.create(postProps).getValue();

    
    expect(post.texto).to.equal(postProps.texto);
    expect(post.comentarios).to.equal(postProps.comentarios);
    expect(post.tags).to.equal(postProps.tags);
    expect(post.likes).to.equal(postProps.dislikes);
    expect(post.autorId).to.equal(postProps.autorId);
    expect(post.likesUsers).to.equal(postProps.likesUsers);
    expect(post.dislikesUsers).to.equal(postProps.dislikesUsers);


  });

  


});