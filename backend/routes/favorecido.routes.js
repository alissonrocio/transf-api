import express from 'express'

import controllerFavorecido from '../controllers/favorecido.controller.js'

import validation from '../validation/favorecido.validation.js';

const router = express.Router()

// Get All 
router.get('/', validation.getAll , controllerFavorecido.getAll);

//Get By Id
router.get('/:id', validation.getById ,controllerFavorecido.getById);

//Post
router.post('/', validation.create , controllerFavorecido.create);

//Patch
router.patch('/:id', validation.edit ,controllerFavorecido.edit);

//Remove 
router.delete('/:id', validation.remove , controllerFavorecido.remove);

export default router;