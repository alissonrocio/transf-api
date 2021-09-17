import express from 'express'

import bancoRouter from './routes/banco.routes.js'
import favorecidoRouter from './routes/favorecido.routes.js'
import favorecidoBancoRouter from './routes/favorecido-banco.routes.js'

import db from './db/db.js'

const app = express()
const port = process.env.PORT || 8087

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})

initDb();

// Inicia o banco
async function initDb() {
 //await db.iniciaDb();
}