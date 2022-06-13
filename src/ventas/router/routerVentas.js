import { Router } from 'express'
import * as ventasController from '../controller/ventasController.js'



const routerVentas = new Router()

routerVentas.get('/', ventasController.getAllOrByUser)
routerVentas.get('/:id', ventasController.getPorId)
routerVentas.post('/', ventasController.postVenta)
routerVentas.delete('/:id', ventasController.deleteVenta)
routerVentas.put('/:id', ventasController.putVenta)

export { routerVentas }