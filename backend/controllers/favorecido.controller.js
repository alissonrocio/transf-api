
import Favorecido from '../db/models/favorecido.model.js';
import Constantes from '../utils/const.js'
import Enumerados from '../utils/enums.js'

const getAll =  async function(req, res) {
    try
    {
        // Página desejada
        const page = req.query.page ? parseInt(req.query.page) ? parseInt(req.query.page) : 1 : 1;        
        
        // Default da paginação
        let params = {
            order: ['id'],
            limit: Constantes.Api.Paginacao,
            offset: (page - 1) * Constantes.Api.Paginacao
        };       
        
        if (req.query.search)
        {
            params.where = {
                [Constantes.Sequelize.OperadoresSequelize.or] : [
                    {nome: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {cpfcnpj: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {email: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}}
                ]
            };
        }

        // Faz a busca
        const favorecidos = await Favorecido.findAndCountAll(params);   

        const retorno = {
            page : page,
            pageSize : Constantes.Api.Paginacao,
            length : favorecidos.count,
            data : favorecidos.rows
        }
        
        //Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: retorno , mensagem: !favorecidos ? "Registro não encontrado!!!" : null });
    }
    catch (error)
    {
        console.error("getAll - Deu ruim :(",error);
        res.statusCode = 400;        
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const create = async function(req, res) {
    try
    {      
        await Favorecido.create(req.body);  

        // Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: req.body , mensagem: "Registro criado com sucesso!!!"});
    }
    catch (error)
    {
        console.error("create - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const getById = async function(req, res) {
    try
    {   
        // Se o parâmetro não é um inteiro retorna erro.
        if (!parseInt(req.params.id))
        {
            res.statusCode = 400;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: "Url inválida!!!"});
            return;
        }
        
        // Busca o registro
        const favorecido = await Favorecido.findByPk(parseInt(req.params.id));
       
        // Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: favorecido , mensagem: !favorecido ? "Registro não encontrado!!!" : null});
    }
    catch (error)
    {
        console.error("getById - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const edit = async function(req, res) {
    try
    {
        // Se o parâmetro não é um inteiro retorna erro.
        if (!parseInt(req.params.id))
        {
            res.statusCode = 400;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: "Url inválida!!!"});
            return;
        }

         // Atualizando o registro no banco
         const qtde = await Favorecido.update(
            req.body,
            {where: {id:req.params.id}}
          );

         // Response
         res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: req.body , mensagem: `${qtde} atualizado!!!`});

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

        // Se o parâmetro não é uma inteiro retorna erro.
        if (!parseInt(req.params.id))
        {
            res.statusCode = 400;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: "Url inválida!!!"});
            return;
        }

        // Apaga o registro do banco
        const qtde = await Favorecido.destroy({
            where : {
                id : req.params.id
             }
        });

        // Response
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: null , mensagem: `${qtde} registro removido!!!`});
        
    }
    catch (error)
    {
        console.error("remove - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

export default { getAll , getById , create , edit  , remove };
