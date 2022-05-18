import { Router } from 'express'
import {
    obtenerUsuarios,
    agregarUsuario,
    obtenerUsuariosPorId,
    borrarUsuarios,
    borrarUsuariosPorId,
    reemplazarUsuarios,
} from './usuarios.js'

const routerUsuarios = new Router()

routerUsuarios.get('/', (req, res) => {
    let usuarios
    usuarios = obtenerUsuarios()
    res.json(usuarios)
})

routerUsuarios.get('/:id', (req, res) => {
    try {
        const usuario = obtenerUsuariosPorId(req.params.id)
        res.json(usuario)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerUsuarios.post('/', (req, res) => {
    try {
        const usuario = req.body
        const usuarioAgregado = agregarUsuario(usuario)
        res.status(201).json(usuarioAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

routerUsuarios.delete('/:id', (req, res) => {
    try {
        borrarUsuariosPorId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerUsuarios.put('/:id', (req, res) => {
    try {
        const datosActualizados = req.body
        const usuarioActualizado = reemplazarUsuarios(req.params.id, datosActualizados)
        res.json(usuarioActualizado)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

export { routerUsuarios }