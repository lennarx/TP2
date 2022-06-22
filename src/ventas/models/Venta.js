import { obtenerNuevoId } from '../../shared/ids/ids.js'
import { crearErrorDeDatosFaltantes } from '../../shared/errors/models/ErrorDeDatosFaltantes.js'

export const crearVenta = (datos) => {
    if (!datos.productos) {
        throw crearErrorDeDatosFaltantes('productos')
    }
    if (!datos.idUsuario) {
        throw crearErrorDeDatosFaltantes('idUsuario')
    }

    const venta = {
        id : obtenerNuevoId('venta'),
        idUsuario : datos.idUsuario,
        productos : datos.productos
    }
        
    return venta;
}