import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IComentarioController from '../../controllers/IControllers/IComentarioController'; 

import config from "../../../config";
import { Comentario } from '../../domain/comentario/comentario';

const route = Router();

export default (app: Router) => {
  app.use('/comentarios', route);

  const ctrl = Container.get(config.controllers.comentario.name) as IComentarioController;

  route.post('',
    celebrate({
      body: Joi.object({
        texto: Joi.string().required(),
        tags: Joi.array(),
        post: Joi.string().required(),
        autorId: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createComentario(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        texto: Joi.string().required(),
        tags: Joi.array(),
        post: Joi.string().required(),
        autorId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateComentario(req, res, next) );

    //dar get a todos os posts de um determinado utilizador
    route.get('/:id',
    (req, res, next) =>{
      ctrl.getComentario(req,res,next);
    });

    route.delete('/delete/:id',
    (req, res, next) => ctrl.deleteComentario(req,res,next));
};