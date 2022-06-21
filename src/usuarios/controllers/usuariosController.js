import {
    obtenerUsuarios,
    agregarUsuario,
    obtenerUsuariosPorId,
    borrarUsuariosPorId,
    reemplazarUsuarios,
} from '../services/usuarios.js'

export async function getAllUsuariosController(req, res, next){
    let usuarios
    usuarios = await obtenerUsuarios()
    res.json(usuarios)
}

export async function getUsuarioByIdController(req,res,next){
    try {
        const usuario = await obtenerUsuariosPorId(req.params.id)
        res.json(usuario)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function postUsuarioController(req, res, next){
    try {
        const usuario = req.body
        const usuarioAgregado = await agregarUsuario(usuario)
        res.status(201).json(usuarioAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function deleteUsuarioController(req, res, next){
    try {
        await borrarUsuariosPorId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function putUsuarioController(req, res, next){
    try {
        const datosActualizados = req.body
        const usuarioActualizado = await reemplazarUsuarios(req.params.id, datosActualizados)
        res.json(usuarioActualizado)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}