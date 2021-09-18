import Constantes from '../utils/const.js'
import Banco from '../db/models/banco.model.js';
import Favorecido from '../db/models/favorecido.model.js';
import FavorecidoBanco from '../db/models/favorecido-banco.model.js';
import assert from 'assert';

describe('build-teste', function() {
    describe('apagar', function() { 
        it('registros de teste', async function() {

            // Apenas para apagar os registros de teste

            await FavorecidoBanco.destroy({
                where : {
                [Constantes.Sequelize.OperadoresSequelize.or]: [
                    {agenciaNumero: '9999'},
                    {contaNumero: '99999999999'},
                    {contaNumero: '99999999'}
                    ]
                }
            });
            await Banco.destroy({
                where : {codigo: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `999`}}               
            });
            await Favorecido.destroy({
                where : {cpfcnpj: {[Constantes.Sequelize.OperadoresSequelize.iLike] : `00000000000`}}               
            });

            assert.equal(1,1);
        });   
    });
});