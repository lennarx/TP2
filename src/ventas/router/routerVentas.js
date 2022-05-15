import { Router } from 'express'
import {
    obtenerVentas,
    agregarVenta,
    obtenerVentasSegunUsuario,
    obtenerVentasPorId,
    borrarVentaPorId,
    reemplazarVenta
} from '../services/ventas.js'

const routerVentas = new Router()

routerVentas.get('/', (req, res) => {
    let ventas
    if (req.query.idUsuario) {
        ventas = obtenerVentasSegunUsuario(req.query.idUsuario)
    } else {
        ventas = obtenerVentas()
    }
    res.json(ventas)
})

routerVentas.get('/:id', (req, res) => {
    try {
        const venta = obtenerVentasPorId(req.params.id)
        res.json(venta)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerVentas.post('/', (req, res) => {
    try {
        const venta = req.body
        const ventaAgregada = agregarVenta(venta)
        res.status(201).json(ventaAgregada)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

routerVentas.delete('/:id', (req, res) => {
    try {
        borrarVentaPorId(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

routerVentas.put('/:id', (req, res) => {
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
})

export { routerVentas }