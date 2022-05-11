import { crearProducto } from "./Producto.js";

const productos = []

const copiarProducto = (producto) => {
    return ({ id: producto.id, nombreProducto: producto.nombreProducto, descripcionProducto: producto.descripcionProducto, precioProducto : producto.precioProducto })
}

const copiarProductos = (productos) => {
    return productos.map(copiarProducto)
}

export const obtenerProductos = () => {
    return copiarProductos(productos);
}

export const agregarProducto = datosProducto => {
    const producto = crearProducto(datosProducto)
    productos.push(producto)
    return producto
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
        productos.splice(indiceBuscado, 1)
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