import { Router } from 'express'
import {
    obtenerProductos,
    obtenerProductoPorId,
    insertarProducto,
    borrarProductoSegunId,
    reemplazarProducto,
} from './productos.js'

const routerProductos = new Router()

routerProductos.get('/', (req, res) => {
    let productos

    productos = obtenerProductos()

    res.json(productos)
})

routerProductos.get('/:id', (req, res) => {
    try {
        const producto = obtenerProductoPorId(req.params.id)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerProductos.post('/', (req, res) => {
    try {
        const producto = req.body
        const productoAgregado = insertarProducto(producto)
        res.status(201).json(productoAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

routerProductos.delete('/:id', (req, res) => {
    try {
        borrarProductoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerProductos.put('/:id', (req, res) => {
    try {
        const datosActualizados = req.body
        const productoActualizado = reemplazarProducto(req.params.id, datosActualizados)
        res.json(productoActualizado)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

export { routerProductos }