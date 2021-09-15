import express from 'express'

import controllerBanco from '../controllers/banco.controller.js'

const router = express.Router()

// Get All 
router.get('/', controllerBanco.getAll);

//Get By Id
router.get('/:id', controllerBanco.getById);

//Post
router.post('/', controllerBanco.create);

//Put
router.put('/:id', controllerBanco.edit);

//Remove
router.delete('/:id', controllerBanco.remove);

export default router;