import {
    obtenerProductos,
    obtenerProductoPorId,
    insertarProducto,
    borrarProductoSegunId,
    reemplazarProducto,
} from '../services/productos.js'

export async function getProductosController(req, res, next) {
    let productos

    productos = await obtenerProductos()

    res.json(productos)
}

export async function getProductoPorIdController(req, res, next) {
    try {
        const producto = await obtenerProductoPorId(req.params.id)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function postProductoController(req, res, next){
    try {
        const producto = req.body
        const productoAgregado = await insertarProducto(producto)
        res.status(201).json(productoAgregado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

export async function deleteProductoController(req, res, next){
    try {
        await borrarProductoSegunId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function putProductoController(req, res, next){
    try {
        const datosActualizados = req.body
        const productoActualizado = await reemplazarProducto(req.params.id, datosActualizados)
        res.json(productoActualizado)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}