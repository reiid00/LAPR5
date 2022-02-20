import { Request, Response, NextFunction } from 'express';

export default interface IComentarioController  {
  createComentario(req: Request, res: Response, next: NextFunction);
  deleteComentario(req: Request, res: Response, next: NextFunction);
  updateComentario(req: Request, res: Response, next: NextFunction);
  getComentario(req: Request, res: Response, next: NextFunction);
}