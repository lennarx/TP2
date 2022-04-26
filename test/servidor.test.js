import assert from 'assert'
import axios from 'axios'
import { conectar, desconectar } from '../src/servidor.js'

import { obtenerVentas } from '../src/ventas.js'

describe('servidor de pruebas', () => {

    before(async () => {
        await conectar()
    })

    after(async () => {
        await desconectar()
    })

    describe('el servidor esta escuchando', () => {

            describe('al pedirle las ventas', () => {
                it('devuelve un array con ventas', async () => {
                    const { data: ventasObtenidas, status } = await axios.get('http://localhost:3000/ventas')
                    assert.strictEqual(status, 200)
                    const ventasReales = obtenerVentas()
                    assert.deepStrictEqual(ventasObtenidas, ventasReales)
                })
            })
        
        describe('al mandarle una venta', () => {
            it('la agrega a las demas existentes', async () => {
                const ventasAntes = obtenerVentas()
                const venta = {
                    idUsuario: 1,
                    productos: [
                        {
                            idProducto: 1,
                            nombreProducto : 'Heladera',
                            precioProducto : 60000
                        }
                    ]
                }
                const { data: ventaAgregada, status } = await axios.post('http://localhost:3000/ventas', venta)
                assert.strictEqual(status, 201)

                const ventasDespues = obtenerVentas()
                assert.strictEqual(ventasDespues.length, ventasAntes.length + 1)
            })
        })

        describe('al mandarle una venta mal formateada', () => {
            it('no agrega nada y devuelve un error', async () => {
                const ventasAntes = obtenerVentas()
                const venta = {
                    id : 2,
                    catalogo : 'Linea blanca'
                }

                await assert.rejects(
                    axios.post('http://localhost:3000/ventas', venta),
                    error => {
                        assert.strictEqual(error.response.status, 400)
                        return true
                    }
                )

                const ventasDespues = obtenerVentas()
                assert.deepStrictEqual(ventasDespues, ventasAntes)
            })
        })
    })
})