# 1. Objetivo

* Criar um crud de cadastro de bancos.

# 2. Rotas

## 2.1 Bancos

### Cadastro de bancos

| Verbo  |  Endpoint  | Body | Param  | Query  | Descrição  | Exemplo
|---|---|---|---|---|---|---|
| GET  |  /api/v1/banco |  | |[page (página a ser filtrada) , search (parâmetro de busca)]  | Lista todas as contas bancárias |  /api/v1/banco?page=1&search= 
| GET  |  /api/v1/banco/{id} | |id |  | Lista a conta bancária pelo id |  /api/v1/banco/1
| POST  |  /api/v1/banco/ | { codigo: string , nome: string }  | | | Cria uma nova conta bancária |  /api/v1/banco/
| PUT  |  /api/v1/banco/{id} | {id: int , codigo: string , nome: string }  | id| | Altera os dados de uma conta bancária pelo id|  /api/v1/banco/1
| DELETE  |  /api/v1/banco/{id} |   | id| | Remove uma conta bancária pelo id |  /api/v1/banco/1