# 1. Objetivo

Criar uma api rodando em nodejs através do express conectando no banco de dados postgres ,
utilizando o sequelize como ORM para manipulação do banco e testes com o mocha.

node + express + sequelize + postgres + mocha

## 1.1 TODO

* Criar um crud de cadastro de bancos.
* Criar um crud de cadastro de favorecidos.
* Criar um crud de cadastro de favorecido banco.
* Criar as rotinas de validação.
* Criar as rotinas de teste.

# 2. Rotas

## 2.1 Bancos

### Cadastro de bancos

| Verbo  |  Endpoint  | Body | Param  | Query  | Descrição  | Exemplo
|---|---|---|---|---|---|---|
| GET  |  /api/v1/banco |  | |[ page (página a ser filtrada) , search (parâmetro de busca) ]  | Lista todas as contas bancárias |  /api/v1/banco?page=1&search= 
| GET  |  /api/v1/banco/{id} | |id |  | Lista a conta bancária pelo id |  /api/v1/banco/1
| POST  |  /api/v1/banco/ | {POST}  | | | Cria uma nova conta bancária |  /api/v1/banco/
| PATCH  |  /api/v1/banco/{id} | {PATCH}  | id| | Altera os dados de uma conta bancária pelo id|  /api/v1/banco/1
| DELETE  |  /api/v1/banco/{id} |   | id| | Remove uma conta bancária pelo id |  /api/v1/banco/1

| Colum  | Type |  Primary Key  | Foreign Key | Required  | Length  | Descrição  
|---|---|---|---|---|---|---|
| id  | integer | yes  | no  | yes |  | 
| codigo  | string | no  | no  | yes | 10 | Código do banco
| nome  | string | no  | no  | yes | 255 | Descrição do banco

{POST} 

```
{ 
    "id": integer , 
    "codigo": string , 
    "nome": string 
}
```
{PATCH}
```
{ 
    "codigo": string , 
    "nome": string 
}
```

## 2.2 Favorecido

### Cadastro de Favorecido

| Verbo  |  Endpoint  | Body | Param  | Query  | Descrição  | Exemplo
|---|---|---|---|---|---|---|
| GET  |  /api/v1/favorecido |  | |[ page (página a ser filtrada) , search (parâmetro de busca) ]  | Lista todas os dados do favorecido|  /api/v1/favorecido?page=1&search= 
| GET  |  /api/v1/favorecido/{id} | |id |  | Lista os favorecidos pelo id |  /api/v1/favorecido/1
| POST  |  /api/v1/favorecido/ | {POST} | | | Cria uma novo favorecido |  /api/v1/favorecido/
| PATCH  |  /api/v1/favorecido/{id} | {PATCH} | id| | Altera os dados de favorecido pelo id|  /api/v1/favorecido/1
| DELETE  |  /api/v1/favorecido/{id} |   | id| | Remove um favorecido pelo id |  /api/v1/favorecido/1

| Colum  | Type |  Primary Key  | Foreign Key | Required  | Length  | Descrição  
|---|---|---|---|---|---|---|
| id  | integer | yes  | no  | yes |  | 
| nome  | string | no  | no  | yes | 255 | Nome do favorecido
| cpfcnpj  | string | no  | no  | yes | 14 | Cpf ou Cnpj do favorecido
| email  | string | no  | no  | yes | 255 | Email do favorecido

{POST} 
```
{ 
    "id": integer,    
    "nome": string , 
    "cpfcnpj": string ,
    "email": string 
}
```

{PATCH}
```
{ 
    "nome": string , 
    "cpfcnpj": string ,
    "email": string 
}
```

## 2.2 Favorecido Banco

### Cadastro de Favorecido Banco

| Verbo  |  Endpoint  | Body | Param  | Query  | Descrição  | Exemplo
|---|---|---|---|---|---|---|
| GET  |  /api/v1/favorecido-banco |  | |[ page (página a ser filtrada) , search (parâmetro de busca) ]  | Lista todas os dados do favorecido|  /api/v1/favorecido-banco?page=1&search= 
| GET  |  /api/v1/favorecido-banco/{id} | |id |  | Lista os favorecidos pelo id |  /api/v1/favorecido-banco/1
| POST  |  /api/v1/favorecido-banco/ | {POST}| | | Cria uma novo favorecidos bancos |  /api/v1/favorecido-banco/
| PATCH  |  /api/v1/favorecido-banco/{id} | {PATCH} | id| | Altera os dados de favorecidos bancos pelo id|  /api/v1/favorecido-banco/1
| DELETE  |  /api/v1/favorecido-banco/{id} |   | id| | Remove um favorecidos bancos pelo id |  /api/v1/favorecido-banco/1
| DELETE  |  /api/v1/favorecido-banco/ | {DELETE}  | | | Remove os favorecidos bancos a partir de uma lista de ids |  /api/v1/favorecido-banco/

| Colum  | Type |  Primary Key  | Foreign Key | Required  | Length  | Descrição  
|---|---|---|---|---|---|---|
| id  | integer | yes  | no  | yes |  | 
| agenciaNumero  | string | no  | no  | yes | 20 | Número da agência
| agenciaDigito  | string | no  | no  | yes | 1 | Dígito da agência
| contaTipo  | integer | no  | no  | yes |  | Tipo da conta [ ContaCorrente (1), ContaPoupanca (2), ContaFacil (3) ]
| contaNumero  | string | no  | no  | yes | 20 | Número da conta
| contaDigito  | string | no  | no  | yes | 1 | Dígito da conta
| status  | integer | no  | no  | yes |  | Status [ Rascunho (1), Validado (2) ]
| idBanco  | integer | no  | yes  | yes |  | Id do banco
| idFavorecido  | integer | no  | yes  | yes |  | Id do favorecido

{POST} - {PATCH}
```
{
    "info": {
        "agenciaNumero": string,
        "agenciaDigito": string,
        "contaTipo": number,
        "contaNumero": string,
        "contaDigito": string,
        "status": number 
        },
    "banco": {      
            "id": number,      
            "codigo": string,
            "nome": string,
    },
    "favorecido": {
        "id": number  <-- Se o id do favorecido não for enviado , vai criar um novo favorecido.
        "nome": string,
        "email": string,
        "cpfcnpj": string
    }
}
```

{DELETE}
```
{
    "ids": []
}
```

# 3. Instruções

Para testar a aplicação inicie clonando o repositório

```
git clone https://github.com/alissonrocio/transf-api.git
```

Tem duas opções para executar a aplicação. 

Rodando direto a aplicação do docker hub ou executando localmente.

## 3.1. Executando do docker hub.

Na pasta da aplicação execute o docker-compose que ele vai subir os dois
container.

Cria os containers
```
docker-compose up
```

Remove os containers
```
docker-compose down
```

A aplicação vai subir na 8087 e o banco na 8086. Caso essas portas estejam usadas
mudar no compose.yml.

## 3.2. Executando localmente.

A aplicação e o banco de dados foram disponibilizados no docker hub.

Mas para executar localmente você vai precisar apenas do banco de dados.

Baixa a imagem do banco de dados com algumas informações preenchidas.

```
docker pull alissonrocio/transfeera-db:latest
```

Cria o container na sua máquina

```
docker run --name algum_nome -p 8084:5432 -d alissonrocio/transfeera-db:latest
```

No reposítorio clonado na pasta backend.

Executar a aplicação.

Obs: No arquivo .env alterar a porta em DBPORT , caso tenha subido o container do banco em outra porta.

```
node index.js
```

Executar os testes

Obs: Se a aplicação estiver rodando pare e rode o comando abaixo.

```
npm test
```

# Referências

* [Node](https://nodejs.org/en/)    - Core
* [Express](https://expressjs.com/) - Servidor web
* [Sequelize](https://sequelize.org/) - ORM
* [Express Validator](https://express-validator.github.io/docs/) - Validações
* [Mocha](https://mochajs.org/) - Teste
