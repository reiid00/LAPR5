import { Request, Response, NextFunction } from 'express';

export default interface IPostController  {
  createPost(req: Request, res: Response, next: NextFunction);
  deletePost(req: Request, res: Response, next: NextFunction);
  updatePost(req: Request, res: Response, next: NextFunction);
  getAllPosts(req: Request, res: Response, next: NextFunction);
}