import {
    manejadorDeErrores
} from '../error/error.js'

//========================================
// # auth.js

import jwt from 'jsonwebtoken'

const PALABRA_CLAVE = 'ortORTortORT'

function codificar(objeto) {
    const token = jwt.sign(objeto, PALABRA_CLAVE);
    return token
}

function decodificar(token) {
    const objeto = jwt.verify(token, PALABRA_CLAVE)
    return objeto
}


function createUser(datos) {
    const username = datos.username
    const password = datos.password
    return {
        username, password
    }
}

const usuarios = [
    {
        username : 'TITO',
        password : '123'
    }
]

function saveUser(user) {
    usuarios.push(user)
}

function getUser(username) {
    return usuarios.find(u => u.username === username)
}

export function postRegisterController(req, res, next) {
    const user = createUser(req.body)
    saveUser(user)
    res.send('registro ok')
}

export function postLoginController(req, res, next) {
    const userReq = req.body
    const user = getUser(userReq.username)
    if (!user) {
        return res.status(401).send('fallo autenticacion')
    }
    if (user.password !== userReq.password) {
        return res.status(401).send('fallo autenticacion')
    }
    const username = userReq.username
    const token = codificar({ username })
    res.json({ token })
}

// app.use(manejadorDeErrores)