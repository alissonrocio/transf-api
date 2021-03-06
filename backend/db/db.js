import Sequelize from 'sequelize'

import Constantes from '../utils/const.js';

const sequelize = {
  con : new Sequelize(Constantes.Db.DbName, Constantes.Db.DbUSer, Constantes.Db.DbPwd, {
    host: Constantes.Db.DbServer,
    port: Constantes.Db.DbPort,
    dialect: Constantes.Sequelize.Dialect,
    logging: false
  }),
  iniciaDb : async function() {
    try {
    
      // Sincroniza a criação tabelas
      const resultado = await this.con.sync();
      
      console.log(resultado);
    } catch (error) {
        console.log(error);
    }
  }
};

export default sequelize;