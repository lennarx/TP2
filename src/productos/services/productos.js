import { crearProducto } from "../models/Producto.js";
import dao from '../database/productosDao.js';

export async function obtenerProductos() {
    return await dao.recuperarProductos();
}

export async function agregarProducto(datosProducto){
    const producto = crearProducto(datosProducto)
    await dao.guardarProducto(producto)
    return producto
}

export async function obtenerProductoPorId(idProducto) {
    return await dao.obtenerProductoPorId(idProducto)
}

export async function insertarProducto(productoNuevo){
    const producto = crearProducto(productoNuevo)
    await dao.guardarProducto(producto)
    return producto  
}

export async function borrarProductoSegunId(id) {
    await dao.borrarProductoPorId(id)
}

export async function reemplazarProducto(id, datosProducto) {
   const producto = crearProducto(datosProducto)
   producto.id = id
   await dao.guardarProducto(producto)
}

export async function borrarProductos() {
   await dao.borrarProductos()
}