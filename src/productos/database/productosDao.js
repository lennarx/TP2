import { MODO_PERSISTENCIA } from '../../shared/configs/config.js'
import * as daoArchivos from './productosDaoArchivo.js'
import * as daoMemoria from './productosDaoMemoria.js'
import * as daoBaseDeDatos from './productosDaoBaseDeDatos.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    case 'DB':
        dao = daoBaseDeDatos
        break
    default:
        dao = daoMemoria
}

export default dao