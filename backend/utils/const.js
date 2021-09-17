import Sequelize from 'sequelize'

const Constantes = {
    Db : {
        ServerName : "localhost",
        DbName: "transfeera",
        DbUSer: "postgres",
        DbPwd: "123456",
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
