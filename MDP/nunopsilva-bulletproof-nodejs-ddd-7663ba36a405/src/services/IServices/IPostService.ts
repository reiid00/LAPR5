import { Result } from "../../core/logic/Result";
import { IPostDTO } from "../../dto/IPostDTO";

export default interface IPostService  {
    createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    updatePost(postDTO: IPostDTO,postId:string): Promise<Result<IPostDTO>>;
    updatePostWithId(postDTO: IPostDTO,postId:string): Promise<Result<IPostDTO>>;

    getPost (postId: string): Promise<Result<IPostDTO>>;

    delete (postId: string): Promise<boolean>;
    getPostsByAutorId (postAutorId: string): Promise<Result<IPostDTO[]>>;
}