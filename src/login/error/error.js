
//=========================
// # manejoErrores.js

export function manejadorDeErrores(error, req, res) {
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