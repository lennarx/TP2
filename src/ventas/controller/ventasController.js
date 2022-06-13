import {
    obtenerVentas,
    agregarVenta,
    obtenerVentasSegunUsuario,
    obtenerVentasPorId,
    borrarVentaPorId,
    reemplazarVenta
} from '../services/ventas.js'

export async function getPorId(req, res, next) {
    try {
        const venta =  await obtenerVentasPorId(req.params.id)
        res.json(venta)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function getAllOrByUser(req, res, next) {
    let ventas
    if (req.query.idUsuario) {
        ventas = await obtenerVentasSegunUsuario(req.query.idUsuario)
    } else {
        ventas = await obtenerVentas()
    }
    res.json(ventas)
}

export async function postVenta (req, res, next) {
    try {
        const venta = req.body
        const ventaAgregada = await agregarVenta(venta)
        res.status(201).json(ventaAgregada)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function deleteVenta (req, res, next) {
    try {
        await borrarVentaPorId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function putVenta(req, res) {
    try {
        const datosActualizados = req.body
        const ventaActualizada = await reemplazarVenta(req.params.id, datosActualizados)
        res.json(ventaActualizada)
    } catch (error) {
        if (error.tipo == 'not found') {
            res.status(404).json({ error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
}