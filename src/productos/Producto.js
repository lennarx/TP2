import { obtenerNuevoId } from '../compartidos/ids.js'

export const crearProducto = (datos) => {
    if (!datos == null) {
        throw new Error('Producto no puede ser nulo')
    }

    const producto ={
        id : obtenerNuevoId('venta'),
        nombreProducto : datos.nombreProducto,
        descripcionProducto: datos.descripcionProducto,
        precioProducto : datos.precioProducto
    }
        
    return producto;
}