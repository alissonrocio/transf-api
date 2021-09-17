import express from 'express'

import controllerFavorecidoBanco from '../controllers/favorecido-banco.controller.js'

import validation from '../validation/favorecido-banco.validation.js';

const router = express.Router()

// Get All 
router.get('/', validation.getAll , controllerFavorecidoBanco.getAll);

//Get By Id
router.get('/:id', validation.getById , controllerFavorecidoBanco.getById);

//Post
router.post('/', validation.create ,controllerFavorecidoBanco.create);

//Patch
router.patch('/:id', validation.edit , controllerFavorecidoBanco.edit);

//Remove 
router.delete('/:id', validation.remove ,controllerFavorecidoBanco.remove);

//Remove
router.delete('/', validation.removeMany , controllerFavorecidoBanco.removeMany);

export default router;