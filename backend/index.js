import express from 'express'
import bancoRouter from './routes/banco.routes.js'
import favorecidoRouter from './routes/favorecido.routes.js'
import favorecidoBancoRouter from './routes/favorecido-banco.routes.js'
import Enumerados from './utils/enums.js'
import { ValidationError } from 'express-validation'

import db from './db/db.js'
const app = express()
let port = process.env.NODEPORT || 8087

app.get('/', async (req, res) => {
  res.send('Olá :)')
})

// Suporte ao json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/v1/banco', bancoRouter)
app.use('/api/v1/favorecido', favorecidoRouter)
app.use('/api/v1/favorecido-banco', favorecidoBancoRouter)

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.statusCode = 400;
    return res.send({tipo: Enumerados.TipoMsgEnum.Erro , data: null , mensagem: err});    
  }

  return res.status(500).json(err)
})

app.listen(port, () => {  
  console.log(`app listening at http://localhost:${port}`)

})

initDb();

// Inicia o banco
async function initDb() {
 //await db.iniciaDb();
}

export default app;