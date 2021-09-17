import DataTypes from 'sequelize'

import db from '../../db/db.js'

import FavorecidoBanco from './favorecido-banco.model.js';

const Favorecido = db.con.define('Favorecidos', {
  // Chave Primária
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Nome do Favorecido
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Cpf e Cnpj
  cpfcnpj: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  // Email
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }  
}, {
    freezeTableName: true,
    timestamps: false  
});

FavorecidoBanco.belongsTo(Favorecido, { foreignKey: 'idFavorecido'});

export default Favorecido;