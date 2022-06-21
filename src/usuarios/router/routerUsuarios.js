import { Router } from 'express'
import { deleteUsuarioController, getAllUsuariosController, getUsuarioByIdController, postUsuarioController, putUsuarioController } from '../controllers/usuariosController.js'

const routerUsuarios = new Router()

routerUsuarios.get('/', getAllUsuariosController)

routerUsuarios.get('/:id', getUsuarioByIdController)

routerUsuarios.post('/', postUsuarioController)

routerUsuarios.delete('/:id', deleteUsuarioController)

routerUsuarios.put('/:id', putUsuarioController)

export { routerUsuarios }