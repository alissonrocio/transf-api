import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js';

import Constantes from '../utils/const.js'
import Banco from '../db/models/banco.model.js';
import Favorecido from '../db/models/favorecido.model.js';
import FavorecidoBanco from '../db/models/favorecido-banco.model.js';

describe('ENDPOINT - BANCO', function() {
  // POST
  describe('POST/ create', function() { 
    it('novo registro', async function() {
      const response = await supertest(app)
                             .post('/api/v1/banco/')
                             .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste"    
                                   });
      assert.equal(response.statusCode,200);
    });   
    it('campo inválido', async function() {
      const response = await supertest(app)
                             .post('/api/v1/banco/')
                             .send({
                                    "codigo":"99999999999999999999",
                                    "nome":"Sou um banco de teste"    
                              });
      assert.equal(response.statusCode,400);
    });   
    it('campo obrigatório', async function() {
      const response = await supertest(app)
                             .post('/api/v1/banco/')
                             .send({
                                    "nome":"Sou um banco de teste"    
                              });
      assert.equal(response.statusCode,400);
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .post('/api/v1/bancos/')
                             .send({
                                  "codigo":"999",
                                  "nome":"Sou um banco de teste"    
                              });
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                             .post('/api/v1/banco/1')
                             .send({
                                  "codigo":"999",
                                  "nome":"Sou um banco de teste"    
                              });
      assert.equal(response.statusCode,404);
    });  
  });
  // GET
  describe('GET/ getall', function() { 
    it('todos os registro', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco/');
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,null);
    });   
    it('busca registro que existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco?search=999&page=1&length=10');      
      assert.equal(response.statusCode,200);
      assert.equal(response.body.data.length > 0, true);
    });   
    it('busca registro que não existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco?search=9999');      
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('parâmetro page errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco?page=1000');     
      assert.equal(response.statusCode,200);                                   
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('parâmetro length errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco?length=1000');            
      assert.equal(response.statusCode,400);
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/bancos');      
      assert.equal(response.statusCode,404);
    });  
  });
  // GET BY ID
  describe('GET/ getById', function() { 
    it('busca registro que existe', async function() {
      const create = await supertest(app)
                             .post('/api/v1/banco/')
                             .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste"    
                                   });
     const response = await supertest(app)
                             .get(`/api/v1/banco/${create.body.data}`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.data.id,create.body.data)
    });   
    it('busca registro que não existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco/9999999');   
      assert.equal(response.statusCode,200);   
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/bancos/9999999');      
      assert.equal(response.statusCode,404);
    });  
    it('url inválida', async function() {
      const response = await supertest(app)
                             .get('/api/v1/banco/x');   
      assert.equal(response.statusCode,400);
    });  
  }); 
  // PATCH
  describe('PATCH/ edit', function() { 
    it('atualiza registro que existe', async function() {
      const create = await supertest(app)
                             .post('/api/v1/banco/')
                             .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste"    
                                   });
      const response = await supertest(app)
                             .patch(`/api/v1/banco/${create.body.data}`)
                             .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste atualizado"    
                                   });
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"1 registro atualizado!!!");
    });   
    it('atualiza registro que não existe', async function() {
      const response = await supertest(app)
                             .patch(`/api/v1/banco/9999999`)
                             .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste atualizado"    
                                   });
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro atualizado!!!");
    });   
    it('atualiza registro sem parâmetro', async function() {
      const response = await supertest(app)
                            .patch(`/api/v1/banco/`)
                            .send({
                                  "codigo":"999",
                                  "nome":"Sou um banco de teste atualizado"    
                                  });
      assert.equal(response.statusCode,404);
    });  
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .patch(`/api/v1/bancos/9999999`)
                             .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste atualizado"    
                                   });
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                              .patch(`/api/v1/banco/x`)
                              .send({
                                    "codigo":"999",
                                    "nome":"Sou um banco de teste atualizado"    
                                    });
      assert.equal(response.statusCode,400);
    });  
  });
  // DELETE
  describe('DELETE/ remove', function() { 
    it('remove registro que existe', async function() {
      const create = await supertest(app)
                          .post('/api/v1/banco/')
                          .send({
                                "codigo":"999",
                                "nome":"Sou um banco de teste"    
                                });
      const response = await supertest(app)
                            .delete(`/api/v1/banco/${create.body.data}`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"1 registro removido!!!");
    });
    it('remove registro que não existe', async function() {
      const response = await supertest(app)
                            .delete(`/api/v1/banco/9999999`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro removido!!!");
    });
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/bancos/9999999`)
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/banco/x`);
      assert.equal(response.statusCode,400);
    });  
  });

});