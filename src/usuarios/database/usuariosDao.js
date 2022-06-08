import { MODO_PERSISTENCIA } from '../../configs/config.js'
import * as daoArchivos from './usuariosDaoArchivo.js'
import * as daoMemoria from './usuariosDaoMemoria.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    default:
        dao = daoMemoria
}

export default dao