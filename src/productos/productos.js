import { crearProducto } from "./Producto.js";

const productos = []

export const obtenerProductos = () => {
    return productos.map(e =>({productos: e.productos}));
}

export const obtenerProductoPorId = (idProducto) => {
    return productos.find(p => p.id.toString() === idProducto)
}

export const insertarProducto = (productoNuevo) => {
    const producto = crearProducto(productoNuevo)
    productos.push(producto)
    return producto    
}

export function borrarProductoSegunId(id) {
    const indiceBuscado = productos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw new Error('producto no encontrada')
    } else {
        prosuctos.splice(indiceBuscado, 1)
    }
}

export function reemplazarProducto(id, datosProducto) {
    const indiceBuscado = productos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw new Error('carrera no encontrada')
    } else {
        const producto = crearProducto(datosProducto)
        producto.id = id
        productos[indiceBuscado] = producto
    }
}

export const borrarProductos = () => {
    while (productos.length > 0) {
        productos.pop()
    }
}