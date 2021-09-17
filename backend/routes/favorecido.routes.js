import express from 'express'

import controllerFavorecido from '../controllers/favorecido.controller.js'

const router = express.Router()

// Get All 
router.get('/', controllerFavorecido.getAll);

//Get By Id
router.get('/:id', controllerFavorecido.getById);

//Post
router.post('/', controllerFavorecido.create);

//Patch
router.patch('/:id', controllerFavorecido.edit);

//Remove 
router.delete('/:id', controllerFavorecido.remove);

export default router;