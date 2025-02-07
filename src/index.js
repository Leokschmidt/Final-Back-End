import express from 'express'
import cors from 'cors'

import usersRouter from './routes/users'
import messagesRouter from './routes/messages'

const app = express()

app.use(express.json())
app.use(cors()) 

app.use('/users', usersRouter)
app.use('/messages', messagesRouter)


const port = 3000

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
})
