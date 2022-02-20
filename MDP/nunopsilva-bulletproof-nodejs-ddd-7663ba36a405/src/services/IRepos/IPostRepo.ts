import { Repo } from "../../core/infra/Repo";
import { Post } from "../../domain/post/post";

export default interface IPostRepo extends Repo<Post> {
	save(post: Post): Promise<Post>;
	delete (id: string): Promise<boolean>;
	update(post: Post): Promise<Post>;
	findById (id: string): Promise<Post>;
	findAllByAutorId (postAutorId: string): Promise<Post[]>;
}