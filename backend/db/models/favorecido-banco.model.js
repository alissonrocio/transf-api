import DataTypes from 'sequelize'

import db from '../../db/db.js'

const FavorecidoBanco = db.con.define('Favorecidos_Bancos', {
    // Chave Primária
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Número da Agência
    agenciaNumero: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // Dígito da agência
    agenciaDigito: {
        type: DataTypes.STRING(1),
        allowNull: true
    },
    // Tipo da Conta [(1) Conta Corrente , (2) Conta Poupança, (3) Conta Fácil]
    contaTipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Número da conta
    contaNumero: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // Dígito da conta
    contaDigito: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    // Status [Validado , Rascunho]
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
},
{  
    freezeTableName: true,
    timestamps: false
});

export default FavorecidoBanco;