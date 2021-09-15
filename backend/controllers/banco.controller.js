
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
            limit: Constantes.Paginacao,
            offset: (page - 1) * Constantes.Paginacao
        };
       
        if (req.query.search)
        {
            params.where = {
                [Constantes.OperadoresSequelize.or]: [
                    {codigo: {[Constantes.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {nome: {[Constantes.OperadoresSequelize.iLike] : `%${req.query.search}%`}},]
            };
        }

        // Faz a busca
        const bancos = await Banco.findAndCountAll(params);   

        const retorno = {
            page : page,
            pageSize : Constantes.Paginacao,
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

        // Verifica se é diferente o id do parâmetro com o id do body
        if (req.params.id != req.body.id)
        {
            res.statusCode = 400;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: "Id do parâmetro diferente do id do objeto!!!"});
        }

        console.log(req.body);
        console.log(req.params.id);

        // Busca o registro
        const banco = await Banco.findByPk(parseInt(req.params.id));

        // Se não encontrou o registro
        if (!banco)
        {
            res.statusCode = 404;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: `Registro Id: ${req.params.id} não encontrado!!!`});
            return;
        }

         // Atualizando o registro no banco
         await Banco.update(
            req.body,
            {where: {id:req.params.id}}
          );

         // Response
         res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: req.body , mensagem: `Registro Id: ${req.params.id} atualizado com sucesso!!!`});

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

        // Acha o registro
        const banco = await Banco.findByPk(req.params.id);

        // Se não encontrou o registro
        if (!banco)
        {
            res.statusCode = 404;
            res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: `Registro id: ${req.params.id} não encontrado!!!`});
            return;
        }

        // Apaga o registro do banco
        await banco.destroy();

        // Response
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: null , mensagem: `Registro id: ${req.params.id} removido com sucesso!!!`});
    }
    catch (error)
    {
        console.error("remove - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}
    
export default { getAll , getById , create , edit , remove };