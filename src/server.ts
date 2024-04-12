import fastify from "fastify"
import { knex } from "./database"
import crypto from 'node:crypto'
import { env } from "./env"

const app = fastify()

app.post('/insert', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Teste', 
    amount: 1000,
  })
    .returning('*')
  return transaction
})

app.get('/list', async () => {
  const transactions = await knex('transactions').select('*')
  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Runnin')
  })
