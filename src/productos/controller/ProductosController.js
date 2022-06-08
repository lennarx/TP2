import {
    obtenerProductos,
    obtenerProductoPorId,
    insertarProducto,
    borrarProductoSegunId,
    reemplazarProducto,
} from '../services/productos.js'

export const getProductosController = (req, res, next) => {
    let productos

    productos = obtenerProductos()

    res.json(productos)
}

export const getProductoPorIdController = (req, res, next) => {
    try {
        const producto = obtenerProductoPorId(req.params.id)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const postProductoController = (req, res, next) => {
    try {
        const producto = req.body
        const productoAgregado = insertarProducto(producto)
        res.status(201).json(productoAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

export const deleteProductoController = (req, res, next) => {
    try {
        borrarProductoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const putProductoController = (req, res, next) => {
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
}