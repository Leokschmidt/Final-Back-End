import {users} from '../routes/users'

export function validateUserRegistration(request , response , next) {
    const {name , email , password} = request.body

    const emailAlreadyRegistred = users.find(user => user.email === email)

    if (!name) {
        response.status(400).json({
            message: 'Por favor, verifique se passou o nome.'
        })
    }

    else if (!email) {
        response.status(400).json({
            message: 'Por favor, verifique se passou o email.'
        })
    }

    else if (emailAlreadyRegistred) {
        response.status(400).json({
            message: 'Email já cadastrado, insira outro.'
        })
    }

    else if (!password) {
        response.status(400).json({
            message: 'Por favor, verifique se passou a senha.'
        })
    }


    next()

}

export function validateUserLogin(request , response , next) {
    const {email , password} = request.body

    if (!email) {
        response.status(400).json({
            message: 'Insira um e-mail válido'
        })
    }

    if (!password) {
        response.status(400).json({
            message: 'Insira uma senha válida'
        })
    }

    next()
}

export function validateCreateMessage(request , response , next) {
    const {title , description} = request.body

    if (!title) {
        response.status(400).json({
            message: 'Por favor insira um tÍtulo.'
        })
    }

    if (!description) {
        response.status(400).json({
            message: 'Por favor insira uma descrição.'
        })
    }
    next()
}