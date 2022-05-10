import { obtenerNuevoId } from '../compartidos/ids.js'

export const crearVenta = (datos) => {
    if (!datos.productos) {
        throw new Error('No puede haber ventas sin productos')
    }
    if (!datos.idUsuario) {
        throw new Error('La venta debe tener un usuario')
    }

    const venta ={
        id : obtenerNuevoId('venta'),
        idUsuario : datos.idUsuario,
        productos : datos.productos
    }
        
    return venta;
}