import express from 'express'
import { obtenerVentaPorId, obtenerVentas, insertarVenta } from './ventas.js'

const app = express()

app.use(express.json())

app.get('/ventas', (req, res) => {
    const ventas = obtenerVentas()
    res.json(ventas)
})

app.post('/ventas', (req, res) => {
    try {
        const venta = req.body
        const ventaAgregada = insertarVenta(venta)
        res.status(201).json(ventaAgregada)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

let server

export function conectar() {
    return new Promise((resolve, reject) => {
        server = app.listen(3000, () => {
            resolve(server.address().port)
        })
        server.on('error', error => {
            reject(error)
        })
    })
}

export function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(error => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}