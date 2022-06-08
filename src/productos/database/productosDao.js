import { MODO_PERSISTENCIA } from '../../configs/config.js'
import * as daoArchivos from './productosDaoArchivo.js'
import * as daoMemoria from './productosDaoMemoria.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    default:
        dao = daoMemoria
}

export default dao