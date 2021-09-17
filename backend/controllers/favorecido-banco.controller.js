
import FavorecidoBanco from '../db/models/favorecido-banco.model.js';
import Favorecido from '../db/models/favorecido.model.js';
import Banco from '../db/models/banco.model.js';
import Constantes from '../utils/const.js'
import Enumerados from '../utils/enums.js'
import db from '../db/db.js';

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

        params.include = [{ model: Banco } , { model: Favorecido }]

        // Busca do favorecido o nome , cpfcnpj , email e nome do banco
        if (req.query.search)
        {
            params.where = {
                [Constantes.Sequelize.OperadoresSequelize.or] : [
                    {'$Favorecido.nome$' : {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {'$Favorecido.cpfcnpj$' : {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {'$Favorecido.email$' : {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}},
                    {'$Banco.nome$' : {[Constantes.Sequelize.OperadoresSequelize.iLike] : `%${req.query.search}%`}}
                ]
            };
        }

        // Faz a busca
        const favorecidosBancos = await FavorecidoBanco.findAndCountAll(params);   

        const retorno = {
            page : page,
            pageSize : length,
            length : favorecidosBancos.count,
            data : favorecidosBancos.rows
        }
        
        //Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: retorno , mensagem: !favorecidosBancos ? "Registro não encontrado!!!" : null });
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
        const favorecidoBanco = await FavorecidoBanco.findByPk(parseInt(req.params.id), {include:[{model:Banco},{model:Favorecido}]} );
       
        // Response
        res.statusCode = 200;
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: favorecidoBanco , mensagem: !favorecidoBanco ? "Registro não encontrado!!!" : null});
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
        // Se o favorecido já existe , através da chamada ao seu cpj/cnpj ou email , retorna seu id.
        if (req.body.favorecido.id)
        {
            let newFavorecidoBanco = req.body.info;
            newFavorecidoBanco.idFavorecido = req.body.favorecido.id;
            newFavorecidoBanco.idBanco = req.body.banco.id;            

            // Cria o Favorecido
            await FavorecidoBanco.create(newFavorecidoBanco);              
        }
        else {
            const t = await db.con.transaction();
            try {
                
                // Cria um novo favorecido.
                const result = await Favorecido.create(req.body.favorecido , { transaction: t });  
                             
                let newFavorecidoBanco = req.body.info;                             
                newFavorecidoBanco.idFavorecido = result.id;
                newFavorecidoBanco.idBanco = req.body.banco.id;                

                // Cria o Favorecido Banco
                await FavorecidoBanco.create(newFavorecidoBanco,{ transaction: t });  

                //Comita
                await t.commit();
            }
            catch (error) {
                await t.rollback();
                throw error
            }
        }       
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
        let qtde = 0;
        if (req.body.favorecido)
        {
            const t = await db.con.transaction();           
            try {

                // Se o favorecido já existe , através da chamada ao seu cpj/cnpj ou email , retorna seu id.
                if (req.body.favorecido.id)
                { 
                    // Pega o favorecido banco e adiciona o idFavorecido criado.
                    let newFavorecidoBanco = req.body.info;
                    newFavorecidoBanco.idFavorecido = req.body.favorecido.id;
                    if (req.body.banco){
                        newFavorecidoBanco.idBanco = req.body.banco.id;     
                    }                   

                    // Atualiza o Favorecido Banco
                    qtde = await FavorecidoBanco.update(
                        newFavorecidoBanco, 
                        {
                            where: {id:req.params.id}, 
                            transaction: t
                        }
                    );

                    // Atualiza o favorecido.
                    await Favorecido.update(
                        req.body.favorecido, 
                        {
                            where: {id:req.body.favorecido.id},
                            transaction: t
                        });

                    //Comita
                    await t.commit();
                } 
                else {

                    // Cria um novo favorecido.
                    const result = await Favorecido.create(req.body.favorecido , { transaction: t });  

                    // Pega o favorecido banco e adiciona o idFavorecido criado.
                    let newFavorecidoBanco = req.body.info;
                    newFavorecidoBanco.idFavorecido = result.id;
                    newFavorecidoBanco.idBanco = req.body.banco.id;      

                    // Cria o Favorecido Banco
                    qtde = await FavorecidoBanco.update(
                        newFavorecidoBanco,
                        {
                            where: {id:parseInt(req.params.id)},
                            transaction: t
                        });  

                    //Comita
                    await t.commit();                
                }
            }
            catch (error) {
                await t.rollback();
                throw error
            }
        } else {

            // Pega o favorecido banco e adiciona o idFavorecido criado.
            let newFavorecidoBanco = req.body.info;                
            if (req.body.banco){
                newFavorecidoBanco.idBanco = req.body.banco.id;     
            }     

            // Atualiza o Favorecido Banco
            qtde = await FavorecidoBanco.update(
            newFavorecidoBanco, 
            {
                where: {id:req.params.id}                
            });
        }

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

        const qtde = await FavorecidoBanco.destroy({
            where : {
               id : req.params.id
            }
        });        

        // Response
        res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: null , mensagem: `${qtde} registro removido !!!`});
        
    }
    catch (error)
    {
        console.error("remove - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }
}

const removeMany =  async function(req, res) {
    try {
        
        let lista = JSON.parse(JSON.stringify(req.body));

        const qtde = await FavorecidoBanco.destroy({
            where : {
               id : {[Constantes.Sequelize.OperadoresSequelize.in]: lista.ids}
            }
        });

         // Response
         res.send({tipo: Enumerados.TipoMsgEnum.Sucesso , data: null , mensagem: `${qtde} registro(s) removido(s) !!!`});
       
    }
    catch (error)
    {       
        console.error("removeMany - Deu ruim :(",error);
        res.statusCode = 400;
        res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: error});
    }

}

export default { getAll , getById , create , edit  , remove , removeMany };
