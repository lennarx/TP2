import { crearProducto } from "./Producto.js";
import dao from '../productos/database/productosDao.js';

export const obtenerProductos = () => {
    return dao.recuperarProductos();
}

export const agregarProducto = datosProducto => {
    const producto = crearProducto(datosProducto)
    dao.guardarProducto(producto)
    return producto
}

export const obtenerProductoPorId = (idProducto) => {
    return dao.obtenerProductoPorId(idProducto)
}

export const insertarProducto = (productoNuevo) => {
    const producto = crearProducto(productoNuevo)
    dao.guardarProducto(producto)
    return producto  
}

export function borrarProductoSegunId(id) {
    dao.borrarProductoPorId(id)
}

export function reemplazarProducto(id, datosProducto) {
   const producto = crearProducto(datosProducto)
   producto.id = id
   dao.guardarProducto(producto)
}

export const borrarProductos = () => {
   dao.borrarProductos()
}