import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js';

describe('ENDPOINT - FAVORECIDO', function() {
  // POST
  describe('POST/ create', function() { 
    it('novo registro', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecido/')
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                   });
      assert.equal(response.statusCode,200);
    });   
    it('campo inválido', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecido/')
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"11111111111111111",
                                    "email":"a@a.com" 
                              });
      assert.equal(response.statusCode,400);
    });   
    it('campo obrigatório', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecido/')
                             .send({
                                   "nome":"Sou um favorecido de teste",
                              });
      assert.equal(response.statusCode,400);
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecidos/')
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                              });
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecido/1')
                             .send({
                                "nome":"Sou um favorecido de teste",
                                "cpfcnpj":"00000000000",
                                "email":"a@a.com" 
                              });
      assert.equal(response.statusCode,404);
    });  
  });
  // GET
  describe('GET/ getall', function() { 
    it('todos os registro', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido/');
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,null);
    });   
    it('busca registro que existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido?search=00000000000&page=1&length=10');      
      assert.equal(response.statusCode,200);
      assert.equal(response.body.data.length > 0, true);
    });   
    it('busca registro que não existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido?search=9999');      
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('parâmetro page errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido?page=1000');     
      assert.equal(response.statusCode,200);                                   
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('parâmetro length errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido?length=1000');            
      assert.equal(response.statusCode,400);
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecidos');      
      assert.equal(response.statusCode,404);
    });  
  });
  // GET BY ID
  describe('GET/ getById', function() { 
    it('busca registro que existe', async function() {
      const create = await supertest(app)
                             .post('/api/v1/favorecido/')
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                   });
      const response = await supertest(app)
                             .get(`/api/v1/favorecido/${create.body.data}`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.data.id,create.body.data)
    });   
    it('busca registro que não existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido/9999999');   
      assert.equal(response.statusCode,200);   
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecidos/9999999');      
      assert.equal(response.statusCode,404);
    });  
    it('url inválida', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido/x');   
      assert.equal(response.statusCode,400);
    });  
  }); 
  // PATCH
  describe('PATCH/ edit', function() { 
    it('atualiza registro que existe', async function() {
      const create = await supertest(app)
                             .post('/api/v1/favorecido/')
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                   });
      const response = await supertest(app)
                             .patch(`/api/v1/favorecido/${create.body.data}`)
                             .send({
                                    "nome":"Sou um favorecido de teste atualizado",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                   });
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"1 registro atualizado!!!");
    });   
    it('atualiza registro que não existe', async function() {
      const response = await supertest(app)
                             .patch(`/api/v1/favorecido/9999999`)
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                   });
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro atualizado!!!");
    });   
    it('atualiza registro sem parâmetro', async function() {
      const response = await supertest(app)
                            .patch(`/api/v1/favorecido/`)
                            .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                  });
      assert.equal(response.statusCode,404);
    });  
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .patch(`/api/v1/favorecidos/9999999`)
                             .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                   });
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                              .patch(`/api/v1/favorecido/x`)
                              .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                    });
      assert.equal(response.statusCode,400);
    });  
  });
  // DELETE
  describe('DELETE/ remove', function() { 
    it('remove registro que existe', async function() {
      const create = await supertest(app)
                          .post('/api/v1/favorecido/')
                          .send({
                                "nome":"Sou um favorecido de teste",
                                "cpfcnpj":"00000000000",
                                "email":"a@a.com" 
                                });
      const response = await supertest(app)
                            .delete(`/api/v1/favorecido/${create.body.data}`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"1 registro removido!!!");
    });
    it('remove registro que não existe', async function() {
      const response = await supertest(app)
                            .delete(`/api/v1/favorecido/9999999`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro removido!!!");
    });
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/favorecidos/9999999`)
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/favorecido/x`);
      assert.equal(response.statusCode,400);
    });  
  });

});