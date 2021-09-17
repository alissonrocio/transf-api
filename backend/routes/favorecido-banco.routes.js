import express from 'express'

import controllerFavorecidoBanco from '../controllers/favorecido-banco.controller.js'

const router = express.Router()

// Get All 
router.get('/', controllerFavorecidoBanco.getAll);

//Get By Id
router.get('/:id', controllerFavorecidoBanco.getById);

//Post
router.post('/', controllerFavorecidoBanco.create);

//Patch
router.patch('/:id', controllerFavorecidoBanco.edit);

//Remove 
router.delete('/:id', controllerFavorecidoBanco.remove);

//Remove
router.delete('/', controllerFavorecidoBanco.removeMany);

export default router;