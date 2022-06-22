import {extraerUnArchivo} from '../middleware/middlewareArchivo.js'
import {postFotosController} from '../controller/controllerMulter.js'

const routerMulter = new Router();

routerMulter.post('/fotos', extraerUnArchivo, postFotosController)