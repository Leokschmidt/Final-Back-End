import express, { request, response } from 'express'

const router = express.Router()

router.get('/', (request , response) =>{
    response.status(200).json({
        message: 'Bem vindo à aplicação'
    })
})



export default router