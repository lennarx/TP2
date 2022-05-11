import { obtenerNuevoId } from '../compartidos/ids.js'

export const crearProducto = (datos) => {
    if (!datos) {
        throw new Error('Producto no puede ser nulo')
    }

    const producto ={
        id : obtenerNuevoId('producto'),
        nombreProducto : datos.nombreProducto,
        descripcionProducto: datos.descripcionProducto,
        precioProducto : datos.precioProducto
    }
        
    return producto;
}