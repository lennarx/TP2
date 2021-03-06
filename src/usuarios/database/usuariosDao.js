import { MODO_PERSISTENCIA } from '../../shared/configs/config.js'
import * as daoArchivos from './usuariosDaoArchivo.js'
import * as daoMemoria from './usuariosDaoMemoria.js'
import * as daoBaseDeDatos from './usuariosDaoBaseDeDatos.js'

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