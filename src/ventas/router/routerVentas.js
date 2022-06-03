import { Router } from 'express'

//Services imports
import {
    obtenerVentas,
    agregarVenta,
    obtenerVentasSegunUsuario,
    obtenerVentasPorId,
    borrarVentaPorId,
    reemplazarVenta
} from '../services/ventas.js'

//Controller imports
import{
    getVentaPorIdController,
    getVentasController,
    postVentaController,
    deleteVentaController,
    putVentaController
} from '../controller/ventasController.js'



const routerVentas = new Router()

routerVentas.get('/', getVentasController)
routerVentas.get('/:id', getVentaPorIdController)
routerVentas.post('/', postVentaController)
routerVentas.delete('/:id', deleteVentaController)
routerVentas.put('/:id', putVentaController)

export { routerVentas }