import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

const Constantes = {
    Db : {
        DbServer : process.env.DBSERVER,
        DbPort: process.env.DBPORT,
        DbName: process.env.DBNAME,
        DbUSer: process.env.DBUSER,
        DbPwd: process.env.DBPWD,
    },
    Sequelize : {
        OperadoresSequelize : Sequelize.Op,
        Dialect: 'postgres'
    },
    Api : {
        Paginate: 10,
        PaginateMax: 100
    }
}

export default Constantes;
