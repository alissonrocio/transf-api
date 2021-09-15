import Sequelize from 'sequelize'

// TODO :  COLOCAR COMO UMA VARIAVEL DO CONTAINER A CONEXAO DO BANCO
const sequelize = new Sequelize('transfeera', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
  });

  export default sequelize;