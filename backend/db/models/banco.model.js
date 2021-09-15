import DataTypes from 'sequelize'

import db from '../../db/db.js'

const Banco = db.define('Banco', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {  
});

export default Banco;