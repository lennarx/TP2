import { MODO_PERSISTENCIA } from '../../shared/configs/config.js'
import * as daoArchivos from './ventasDaoArchivo.js'
import * as daoMemoria from './ventasDaoMemoria.js'
import * as daoDb from './ventasDaoBaseDeDatos.js'

let dao

switch (MODO_PERSISTENCIA) {
    case 'ARCHIVO':
        dao = daoArchivos
        break
    // case 'DB':
    //     dao = daoDb
    //     break
    default:
        dao = daoMemoria
}

export default dao