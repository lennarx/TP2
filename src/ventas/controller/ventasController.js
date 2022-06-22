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
        next (error)
    }
}

export async function getAllOrByUser(req, res, next) {
    let ventas
    try{
        if (req.query.idUsuario) {
            ventas = await obtenerVentasSegunUsuario(req.query.idUsuario)
    } else {
        ventas = await obtenerVentas()
    }
    res.json(ventas)
    } catch (error) {
    next(error)
}
}

export async function postVenta (req, res, next) {
    try {
        const venta = req.body
        const ventaAgregada = await agregarVenta(venta)
        res.status(201).json(ventaAgregada)
    } catch (error) {
        next(error)
    }
}

export async function deleteVenta (req, res, next) {
    try {
        await borrarVentaPorId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export async function putVenta(req, res, next) {
    try {
        const datosActualizados = req.body
        const ventaActualizada = await reemplazarVenta(req.params.id, datosActualizados)
        res.json(ventaActualizada)
    } catch (error) {
        next(error)
    }
}