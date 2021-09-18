import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js';

describe('ENDPOINT - FAVORECIDO BANCO', function() {
  // POST
  describe('POST/ create', function() { 
    it('novo registro', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecido-banco/')
                             .send({
                                    "info": {
                                        "agenciaNumero": "9999",
                                        "agenciaDigito": "x",
                                        "contaTipo": 1,
                                        "contaNumero": "99999999999",
                                        "contaDigito": "1",
                                        "status": 1    
                                        },
                                    "banco":  await bodyBanco(),
                                    "favorecido": await bodyFavorecido()
                          });
      assert.equal(response.statusCode,200);
    });   
    it('campo inválido', async function() {
      const response = await supertest(app)
      .post('/api/v1/favorecido-banco/')
      .send({
             "info": {
                 "agenciaNumero": "9999",
                 "agenciaDigito": "xxxxx",
                 "contaTipo": 1,
                 "contaNumero": "99999999999",
                 "contaDigito": "1",
                 "status": 1    
                 },
             "banco":  await bodyBanco(),
             "favorecido": await bodyFavorecido()
      }); 
      assert.equal(response.statusCode,400);
    });  
    it('campo obrigatório', async function() {
      const response = await supertest(app)
      .post('/api/v1/favorecido-banco/')
      .send({
             "info": {
                 "agenciaDigito": "xxxxx",
                 "contaTipo": 1,
                 "contaNumero": "99999999999",
                 "contaDigito": "1",
                 "status": 1    
                 },
             "banco":  await bodyBanco(),
             "favorecido": await bodyFavorecido()
      }); 
      assert.equal(response.statusCode,400);
    });   

    it('banco do brasil válido', async function() {
      const _select = await supertest(app)
                      .get(`/api/v1/banco/?search=001`);  
      const response = await supertest(app)
      .post('/api/v1/favorecido-banco/')
      .send({
             "info": {
                "agenciaNumero": "1111",
                 "agenciaDigito": "1",
                 "contaTipo": 1,
                 "contaNumero": "99999999",
                 "contaDigito": "1",
                 "status": 1    
                 },
             "banco":  _select.body.data.data[0], // Banco do Brasil
             "favorecido": await bodyFavorecido()
      }); 
      assert.equal(response.statusCode,200);
    });   
    it('banco do brasil inválido', async function() {
      const _select = await supertest(app)
                      .get(`/api/v1/banco/?search=001`);  
      const response = await supertest(app)
      .post('/api/v1/favorecido-banco/')
      .send({
             "info": {
                "agenciaNumero": "1111",
                 "agenciaDigito": "1",
                 "contaTipo": 1,
                 "contaNumero": "111111111111",
                 "contaDigito": "1",
                 "status": 1    
                 },
             "banco":  _select.body.data.data[0], // Banco do Brasil
             "favorecido": await bodyFavorecido()
      }); 
      assert.equal(response.statusCode,400);
    });  
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecidos-bancos/')
                             .send({});
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                             .post('/api/v1/favorecido-banco/1')
                             .send({});
      assert.equal(response.statusCode,404);
    }); 
  });
  // GET
  describe('GET/ getall', function() { 
    it('todos os registro', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco/');
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,null);
    });   
    it('busca registro que existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco?search=a@a.com&page=1&length=10');      
      assert.equal(response.statusCode,200);
      assert.equal(response.body.data.length > 0, true);
    });   
    it('busca registro que não existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco?search=asdasdasdasdasd');      
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('parâmetro page errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco?page=1000');     
      assert.equal(response.statusCode,200);                                   
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('parâmetro length errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco?length=1000');            
      assert.equal(response.statusCode,400);
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecidos-banco');      
      assert.equal(response.statusCode,404);
    });  
  });
  // GET BY ID
  describe('GET/ getById', function() { 
    it('busca registro que existe', async function() {
      const create = await supertest(app)
                             .post('/api/v1/favorecido-banco/')
                             .send({
                                    "info": {
                                        "agenciaNumero": "9999",
                                        "agenciaDigito": "x",
                                        "contaTipo": 1,
                                        "contaNumero": "99999999999",
                                        "contaDigito": "1",
                                        "status": 1    
                                        },
                                    "banco":  await bodyBanco(),
                                    "favorecido": await bodyFavorecido()
                          });
      const response = await supertest(app)
                             .get(`/api/v1/favorecido-banco/${create.body.data}`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.data.id,create.body.data)
    });   
    it('busca registro que não existe', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco/9999999');   
      assert.equal(response.statusCode,200);   
      assert.equal(response.body.mensagem, "Registro não encontrado!!!");
    });   
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecidos-bancos/9999999');      
      assert.equal(response.statusCode,404);
    });  
    it('url inválida', async function() {
      const response = await supertest(app)
                             .get('/api/v1/favorecido-banco/x');   
      assert.equal(response.statusCode,400);
    });  
  }); 
  // PATCH
  describe('PATCH/ edit', function() { 
    it('atualiza registro que não existe', async function() {
      const response = await supertest(app)
                             .patch(`/api/v1/favorecido-banco/9999999`)
                             .send({});
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro atualizado!!!");
    });   
    it('atualiza registro sem parâmetro', async function() {
      const response = await supertest(app)
                            .patch(`/api/v1/favorecido-banco/`)
                            .send({});
      assert.equal(response.statusCode,404);
    });  
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .patch(`/api/v1/favorecidos-bancos/9999999`)
                             .send({});
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                              .patch(`/api/v1/favorecido-banco/x`)
                              .send({});
      assert.equal(response.statusCode,400);
    });  
  });
  // DELETE
  describe('DELETE/ remove', function() { 
    it('remove registro que existe', async function() {
      const create = await supertest(app)
      .post('/api/v1/favorecido-banco/')
      .send({
             "info": {
                 "agenciaNumero": "9999",
                 "agenciaDigito": "x",
                 "contaTipo": 1,
                 "contaNumero": "99999999999",
                 "contaDigito": "1",
                 "status": 1    
                 },
             "banco":  await bodyBanco(),
             "favorecido": await bodyFavorecido()
      });
      const response = await supertest(app)
                            .delete(`/api/v1/favorecido-banco/${create.body.data}`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"1 registro removido!!!");
    });
    it('remove registro que não existe', async function() {
      const response = await supertest(app)
                            .delete(`/api/v1/favorecido-banco/9999999`);
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro removido!!!");
    });
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/favorecidos-bancos/9999999`)
      assert.equal(response.statusCode,404);
    });   
    it('url inválida', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/favorecido-banco/x`);
      assert.equal(response.statusCode,400);
    });  
  });

  // DELETE ALL
  describe('DELETE/ remove', function() { 
    it('remove registro que existe', async function() {
      const create = await supertest(app)
      .post('/api/v1/favorecido-banco/')
      .send({
             "info": {
                 "agenciaNumero": "9999",
                 "agenciaDigito": "x",
                 "contaTipo": 1,
                 "contaNumero": "99999999999",
                 "contaDigito": "1",
                 "status": 1    
                 },
             "banco":  await bodyBanco(),
             "favorecido": await bodyFavorecido()
      });
      const response = await supertest(app)
                            .delete(`/api/v1/favorecido-banco`)
                            .send({ "ids":[create.body.data]});
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"1 registro(s) removido(s)!!!");
    });
    it('remove registro que não existe', async function() {
      const response = await supertest(app)                            
                            .delete(`/api/v1/favorecido-banco`)
                            .send({ "ids":[99999999]});
      assert.equal(response.statusCode,200);
      assert.equal(response.body.mensagem,"0 registro(s) removido(s)!!!");
    });
    it('url nome errado', async function() {
      const response = await supertest(app)
                             .delete(`/api/v1/favorecidos-bancos`)
                             .send({})
      assert.equal(response.statusCode,404);
    });  
  });

});

/* AUXILIAR */
const bodyBanco = async () => { 
  const _create =  await supertest(app)
                      .post('/api/v1/banco/')
                      .send({
                            "codigo":"999",
                            "nome":"Sou um banco de teste"    
                            });

  const _select = await supertest(app)
                      .get(`/api/v1/banco/${_create.body.data}`);  
  
  return _select.body.data;     
}

const bodyFavorecido = async () => { 
const _create = await supertest(app)
                            .post('/api/v1/favorecido/')
                            .send({
                                    "nome":"Sou um favorecido de teste",
                                    "cpfcnpj":"00000000000",
                                    "email":"a@a.com" 
                                  });

const _select = await supertest(app)
                            .get(`/api/v1/favorecido/${_create.body.data}`);   

return _select.body.data;     
}