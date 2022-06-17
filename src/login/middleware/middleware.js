const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/privado', rutaSoloAdmin, (req, res) => { res.send('mis secretos mejor guardados') })

const permisos = {
    admin: ['pepe']
}


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



//=========================
// # Permisos.js

function rutaSoloAdmin(req, res, next) {
    // aca verifico algo sobre el cliente que envia la peticion
    const token = req.headers.authorization
    const { username } = decodificar(token)
    const user = getUser(username)
    let esAdmin = false
    if (permisos.admin.includes(user.username)) {
        esAdmin = true
    }

    if (esAdmin) {
        next()
    } else {
        const errorPermisos = new Error('acceso restringido al recurso solicitado')
        errorPermisos.tipo = 'NOT_AUTHORIZED'
        next(errorPermisos)
    }
}


function createUser(datos) {
    const username = datos.username
    const password = datos.password
    return {
        username, password
    }
}

const usuarios = []

function saveUser(user) {
    usuarios.push(user)
}

function getUser(username) {
    return usuarios.find(u => u.username === username)
}

app.post('/register', (req, res) => {
    const user = createUser(req.body)
    saveUser(user)
    res.send('registro ok')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = getUser(username)
    if (!user) {
        return res.status(401).send('fallo autenticacion')
    }
    if (user.password !== password) {
        return res.status(401).send('fallo autenticacion')
    }
    const token = codificar({ username })
    res.json({ token })
})

app.use(manejadorDeErrores)



//=========================
// # manejoErrores.js

function postManejadorDeErrores(error, req, res) {
    switch (error.tipo) {
        case 'NOT_AUTHENTICATED':
            res.status(401)
            break
        case 'NOT_AUTHORIZED':
            res.status(403)
            break
        default:
            res.status(200)
    }
    res.json({ msg: 'error - ' + error.message })
}