import { crearVenta } from "../models/Venta.js";
import dao from '../database/ventasDao.js';

export async function obtenerVentas ()  {
    return await dao.recuperarVentas();
}

export async function agregarVenta(datosVenta) {
    const venta = crearVenta(datosVenta)
    await dao.guardarVenta(venta);
    return venta
}

export async function borrarVentas()  {
    await dao.borrarVentas()
}

export async function obtenerVentasSegunUsuario(idUsuario) {
    return await dao.obtenerVentasSegunUsuario(idUsuario)
}

export async function obtenerVentaSegunNombreProducto(nombreProducto)  {
    const ventasBuscadas = ventas.filter(x => x.productos.filter(x => x.nombreProducto === nombreProducto))
    return await copiarVentas(ventasBuscadas)
}

export async function obtenerVentasPorId(idVenta) {
    return await dao.obtenerVentaPorId(idVenta)
}

export async function borrarVentaPorId(idVenta) {
    await dao.borrarVentaPorId(idVenta);
}

export async function reemplazarVenta(idVenta, datosVenta) {
    const venta = crearVenta(datosVenta)
    venta.id = idVenta
    await dao.guardarVenta(venta)
    return venta
}