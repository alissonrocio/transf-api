import express from 'express'

import controllerBanco from '../controllers/banco.controller.js'

import validation from '../validation/banco.validation.js';

const router = express.Router()

// Get All 
router.get('/', validation.getAll , controllerBanco.getAll);

//Get By Id
router.get('/:id', validation.getById , controllerBanco.getById);

//Post
router.post('/', validation.create , controllerBanco.create);

//Put
router.patch('/:id', validation.edit , controllerBanco.edit);

//Remove
router.delete('/:id',  validation.remove , controllerBanco.remove);

export default router;