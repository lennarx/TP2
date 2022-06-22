import { Router } from 'express'
import {
    deleteProductoController,
    getProductoPorIdController,
    getProductosController,
    postProductoController,
    putProductoController
} from '../controller/ProductosController.js'

const routerProductos = new Router()

routerProductos.get('/', getProductosController)
routerProductos.get('/:id', getProductoPorIdController)
routerProductos.post('/', postProductoController)
routerProductos.delete('/:id', deleteProductoController)
routerProductos.put('/:id', putProductoController)

export { routerProductos }