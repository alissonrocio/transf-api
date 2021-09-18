
import { validate, Joi } from 'express-validation'
import Constantes from '../utils/const.js'
import Enumerados from '../utils/enums.js'

const bodyPostValidation = {  
    body: Joi.object({     
      info : Joi.object({
            agenciaNumero: Joi.string().max(4).pattern(/^(?:^0*)[1-9][0-9]{0,3}$/).required(), 
            agenciaDigito: Joi.string().pattern(/^[xX0-9]{0,1}$/).required(),             
            contaNumero: Joi.when(Joi.ref('...banco.codigo'),{
              is: '001', // Banco do Brasil,
              then: Joi.string().max(8).pattern(/^(?:^0*)[1-9][0-9]{0,7}$/),
              otherwise : Joi.string().max(11).pattern(/^(?:^0*)[1-9][0-9]{0,10}$/),
            }).required(),
            contaDigito: Joi.when(Joi.ref('...banco.codigo'),{
              is: '001', // Banco do Brasil,
              then: Joi.string().pattern(/^[xX0-9]{0,1}$/),
              otherwise : Joi.string().pattern(/^[0-9]{0,1}$/),
            }).required(),           
            contaTipo: Joi.when(Joi.ref('...banco.codigo'), {
              is:'001', // Banco do Brasil,
              then: Joi.string().valid(...Object.values(Enumerados.TiposContaEnum)),
              otherwise : Joi.string().valid(Enumerados.TiposContaEnum.ContaCorrente,Enumerados.TiposContaEnum.ContaPoupanca),
            }).required(),
            status:Joi.string().valid(...Object.values(Enumerados.StatusFavorecidoEnum))
      }),
      banco: Joi.object({
        id: Joi.number().required(),
        codigo: Joi.string().max(10).required(),
        nome: Joi.string().max(255).required(), 
      }),
      favorecido: Joi.object({
        id: Joi.number().optional(),
        nome: Joi.string().max(255).required(),
        cpfcnpj: Joi.string().max(14).required(),
        email: Joi.string().max(255).required(),
      }),
    }),
}

const bodyPatchValidation = {  
  body: Joi.object({     
    info : Joi.object({
          agenciaNumero: Joi.string().max(4).pattern(/^(?:^0*)[1-9][0-9]{0,3}$/).optional(), 
          agenciaDigito: Joi.string().pattern(/^[xX0-9]{0,1}$/).optional(),             
          contaNumero: Joi.when(Joi.ref('...banco.codigo'),{
            is: '001', // Banco do Brasil,
            then: Joi.string().max(8).pattern(/^(?:^0*)[1-9][0-9]{0,7}$/),
            otherwise : Joi.string().max(11).pattern(/^(?:^0*)[1-9][0-9]{0,10}$/),
          }).optional(),
          contaDigito: Joi.when(Joi.ref('...banco.codigo'),{
            is: '001', // Banco do Brasil,
            then: Joi.string().pattern(/^[xX0-9]{0,1}$/),
            otherwise : Joi.string().pattern(/^[0-9]{0,1}$/),
          }).optional(),           
          contaTipo: Joi.when(Joi.ref('...banco.codigo'), {
            is:'001', // Banco do Brasil,
            then: Joi.string().valid(...Object.values(Enumerados.TiposContaEnum)),
            otherwise : Joi.string().valid(Enumerados.TiposContaEnum.ContaCorrente,Enumerados.TiposContaEnum.ContaPoupanca),
          }).optional(),
          status:Joi.string().valid(...Object.values(Enumerados.StatusFavorecidoEnum)).optional()
    }),
    banco: Joi.object({
      id: Joi.number().optional(),
      codigo: Joi.string().max(10).optional(),
      nome: Joi.string().max(255).optional(), 
    }),
    favorecido: Joi.object({
      id: Joi.number().optional(),
      nome: Joi.string().max(255).optional(),
      cpfcnpj: Joi.string().max(14).optional(),
      email: Joi.string().max(255).optional(),
    }),   
  }),
}

const bodyDeleteValidation = {
    body: Joi.object({
     ids: Joi.array().items(
        Joi.number().required()
    ).required(),
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

const create =  validate(bodyPostValidation, {}, {});

const edit =  validate({
  body: bodyPatchValidation.body,
  params: paramValidation.params
  }, {}, {});

const remove = validate(paramValidation, {}, {});

const removeMany = validate(bodyDeleteValidation, {}, {});


export default { getAll , getById , create , edit , remove , removeMany};
