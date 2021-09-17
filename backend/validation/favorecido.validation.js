
import { validate, Joi } from 'express-validation'
import Constantes from '../utils/const.js'

const bodyValidation = {
    body: Joi.object({
      nome: Joi.string().max(255).required(),
      cpfcnpj: Joi.string().max(14).required(),
      email: Joi.string().max(255).required(),
    }),
}

const paramValidation = {
    params: Joi.object({ id: Joi.number()})
}

const queryValidation = {
    query: Joi.object(
        { 
            page: Joi.number().min(1),
            search: Joi.string().max(255),
            length: Joi.number().integer().min(0).max(Constantes.Api.PaginateMax)
        })
}

const getAll = validate(queryValidation, {}, {});

const getById = validate(paramValidation, {}, {});

const create =  validate(bodyValidation, {}, {});

const edit =  validate(paramValidation, {}, {});

const remove = validate(paramValidation, {}, {});


export default { getAll , getById , create , edit , remove};

