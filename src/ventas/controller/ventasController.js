import {
    obtenerVentas,
    agregarVenta,
    obtenerVentasSegunUsuario,
    obtenerVentasPorId,
    borrarVentaPorId,
    reemplazarVenta
} from '../services/ventas.js'

export const getVentaPorIdController = (req, res, next) => {
    try {
        const venta = obtenerVentasPorId(req.params.id)
        res.json(venta)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const getVentasController = (req, res) => {
    let ventas
    if (req.query.idUsuario) {
        ventas = obtenerVentasSegunUsuario(req.query.idUsuario)
    } else {
        ventas = obtenerVentas()
    }
    res.json(ventas)
}

export const postVentaController = (req, res, next) => {
    try {
        const venta = req.body
        const ventaAgregada = agregarVenta(venta)
        res.status(201).json(ventaAgregada)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteVentaController = (req, res, next) => {
    try {
        borrarVentaPorId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const putVentaController = (req, res) => {
    try {
        const datosActualizados = req.body
        const ventaActualizada = reemplazarVenta(req.params.id, datosActualizados)
        res.json(ventaActualizada)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}