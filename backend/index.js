import express from 'express'

import bancoRouter from './routes/banco.routes.js'

const app = express()
const port = process.env.PORT || 8087

app.get('/', (req, res) => {
  res.send('Olá :)')
})

// Suporte ao json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/v1/banco', bancoRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
