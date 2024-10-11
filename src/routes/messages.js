import express, { request, response } from 'express'
import {v4 as uuidv4} from 'uuid'
import { validateCreateMessage } from '../middlewares/validation'


import {users} from './users'

const router = express.Router()

const messages = []

router.post('/message', validateCreateMessage, (request , response) =>{
    const {email , title , description} = request.body


    const user = users.find(user => user.email === email)

    if (!user) {
        return response.status(404).json({
            message: 'Email não encontrado, verifique ou crie uma conta'
        })
    }

    const newMessage = {
        email,
        title,
        description,
        id: uuidv4()
    }

    messages.push(newMessage)

    response.status(201).json({
        message: 'Mensagem criada com sucesso!',
        newMessage
    })


})

router.get('/message/:email', (request , response) =>{
    const {email} = request.params

    const msg = messages.filter(message => message.email === email)

    if(msg.length === 0) {
        return response.status(404).json({
            message: 'Email não encontrado, verifique ou crie uma conta'
        })
    }

    return response.status(200).json({
        message: 'Seja bem-vindo!',
        msg
    })


})


router.put('/message/:id', (request , response) =>{
    const {title , description} = request.body
    const {id} = request.params

    const msg = messages.find(message => message.id === id)

    if (!msg) {
        return response.status(404).json({
            message: 'Por favor, informe um id válido da mensagem'
        })
    }

    msg.title = title
    msg.description = description

    return response.status(200).json({
        message:  'Mensagem atualizada com sucesso !',
        msg
    })

})


router.delete('/message/:id', (request , response) =>{
    const {id} = request.params

    const indexMsg = messages.findIndex(message => message.id === id)

    if (indexMsg === -1) {
        return response.status(404).json({
            message: 'Mensagem não encontrada, verifique o identificador em nosso banco'
        })
    }

    const [deletedMsg] = messages.splice(indexMsg , 1)

    response.status(200).json({
        message: 'Mensagem apagada com sucesso'
    })

})





export default router