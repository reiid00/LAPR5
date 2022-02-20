import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IComentarioController from "./IControllers/IComentarioController";
import IComentarioService from "../services/IServices/IComentarioService";
import {IComentarioDTO} from "../dto/IComentarioDTO";

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class ComentarioController implements IComentarioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.comentario.name) private comentarioServiceInstance : IComentarioService
  ) {}
  async getComentario(req: Request, res: Response, next: NextFunction) {
    try {
      const comentarioOrError = await this.comentarioServiceInstance.getComentario(req.params.id);
        
      if (comentarioOrError.isFailure) {
        return res.status(402).send();
      }

      const comentarioDTO = comentarioOrError.getValue();
      return res.json( comentarioDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async createComentario(req: Request, res: Response, next: NextFunction) {
    try {
      const comentarioOrError = await this.comentarioServiceInstance.createComentario(req.body as IComentarioDTO) as Result<IComentarioDTO>;
        
      if (comentarioOrError.isFailure) {
        return res.status(402).send();
      }

      const comentarioDTO = comentarioOrError.getValue();
      return res.json( comentarioDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteComentario(req: Request, res: Response, next: NextFunction) {
    try {
      const trueOrError = await this.comentarioServiceInstance.delete(req.params.id);
        
      if (!trueOrError) {
        return res.status(402).send();
      }
      return res.json( req.params.id ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateComentario(req: Request, res: Response, next: NextFunction) {
    try {
      const comentarioOrError = await this.comentarioServiceInstance.updateComentario(req.body as IComentarioDTO) as Result<IComentarioDTO>;

      if (comentarioOrError.isFailure) {
        return res.status(404).send();
      }

      const comentarioDTO = comentarioOrError.getValue();
      return res.status(201).json( comentarioDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}