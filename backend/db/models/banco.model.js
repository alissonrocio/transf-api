import DataTypes from 'sequelize'

import db from '../../db/db.js'

import FavorecidoBanco from './favorecido-banco.model.js';

const Banco = db.con.define('Bancos', {
  // Chave Primária
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Código do Banco
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Nome do Banco
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {  
    freezeTableName: true,
    timestamps: false
});

FavorecidoBanco.belongsTo(Banco, {  foreignKey: 'idBanco'});

export default Banco;