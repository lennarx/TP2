import { Router } from 'express'
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