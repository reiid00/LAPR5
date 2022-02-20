import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPostController from '../../controllers/IControllers/IPostController'; 

import config from "../../../config";
import { Post } from '../../domain/post/post';
import PostRepo from '../../repos/postRepo';

const route = Router();

export default (app: Router) => {
  app.use('/posts', route);


  const ctrl = Container.get(config.controllers.post.name) as IPostController;

  route.post('',
    celebrate({
      body: Joi.object({
        texto: Joi.string().required(),
        tags: Joi.array().required(),
        comentarios: Joi.array(),
        likes: Joi.number().required(),
        dislikes: Joi.number().required(),
        autorId: Joi.string().required(),
        likesUsers: Joi.array(),
        dislikesUsers: Joi.array(),

      })
    }),
    (req, res, next) =>{
       ctrl.createPost(req, res, next);
      }
        );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        texto: Joi.string().required(),
        tags: Joi.array().required(),
        comentarios: Joi.array().required(),
        likes: Joi.number().required(),
        dislikes: Joi.number().required(),
        autorId: Joi.string().required(),
        likesUsers: Joi.array().required(),
        dislikesUsers: Joi.array().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePost(req, res, next) );

    //dar get a todos os posts de um determinado utilizador
    route.get('/:autorId',
    (req, res, next) => ctrl.getAllPosts(req,res,next));

    route.delete('/delete/:id',
    (req, res, next) => ctrl.deletePost(req,res,next));

};