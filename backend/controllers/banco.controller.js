import Banco from '../db/models/banco.model.js';
import Constantes from '../utils/const.js'
import Enumerados from '../utils/enums.js'

const getAll =  async function(req, res) {
    try
    {
        // Página desejada
        const page = req.query.page ? parseInt(req.query.page) : 1;     
        // Quantidade de registros
        const length = req.query.length ? parseInt(req.query.length) : Constantes.Api.Paginate;     
        
        // Default da paginação
        let params = {
            order: ['id'],
            limit: length,
            offset: (page - 1) * length
        };
       
        if (req.query.search)
        {
            params.where = {
                [Constantes.Sequelize.OperadoresSequelize.or]: [
                    {codigo: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {nome: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},]
            };
        }

        // Faz a busca
        const bancos = await Banco.findAndCountAll(params);   

        const retorno = {
            page : page,
            pageSize : length,
            length : bancos.count,
            data : bancos.rows
        }
        
        //Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: retorno , mensagem: bancos.rows.length == 0 ? "Registro não encontrado!!!" : null });
    }
    catch (error)
    {
        console.error("getAll - Deu ruim :(",error);
        res.statusCode = 400;        
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const getById = async function(req, res) {
    try
    {   
        // Busca o registro
        const banco = await Banco.findByPk(parseInt(req.params.id));
       
        // Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: banco , mensagem: !banco ? "Registro não encontrado!!!" : null});
    }
    catch (error)
    {
        console.error("getById - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const create = async function(req, res) {
    try
    {      
        // Inserindo o registro no banco
        const result = await Banco.create(req.body);  

        // Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: result.id , mensagem: "Registro criado com sucesso!!!"});
    }
    catch (error)
    {
        console.error("create - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const edit = async function(req, res) {
    try
    {
         // Atualizando o registro no banco
         const qtde = await Banco.update(
            req.body,
            {where: {id:req.params.id}}
          );

         // Response
         res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: req.body , mensagem: `${qtde} registro atualizado!!!`});

    }
    catch (error)
    {
        console.error("edit - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const remove = async function(req, res) {
    try {

        // Apaga o registro do banco
        const qtde = await Banco.destroy({
            where : {
                id : req.params.id
             }
        });

        // Response
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: req.params.id , mensagem: `${qtde} registro removido!!!`});
    }
    catch (error)
    {
        console.error("remove - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}
    
export default { getAll , getById , create , edit , remove };