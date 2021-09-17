import Banco from '../db/models/banco.model.js';
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
                [Constantes.Sequelize.OperadoresSequelize.or]: [
                    {codigo: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {nome: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},]
            };
        }

        // Faz a busca
        const bancos = await Banco.findAndCountAll(params);   

        const retorno = {
            page : page,
            pageSize : Constantes.Api.Paginacao,
            length : bancos.count,
            data : bancos.rows
        }
        
        //Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: retorno , mensagem: !bancos ? "Registro não encontrado!!!" : null });
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
        // Se o parâmetro não é um inteiro retorna erro.
        if (!parseInt(req.params.id))
        {
            res.statusCode = 400;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: "Url inválida!!!"});
            return;
        }
        
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
        await Banco.create(req.body);  

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

        // Se o parâmetro não é uma inteiro retorna erro.
        if (!parseInt(req.params.id))
        {
            res.statusCode = 400;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: "Url inválida!!!"});
            return;
        }

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