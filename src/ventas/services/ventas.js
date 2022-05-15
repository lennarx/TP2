import { crearVenta } from "../models/Venta.js";
import dao from '../database/ventasDao.js';

export const obtenerVentas = () => {
    return dao.recuperarVentas();
}

export const agregarVenta = datosVenta => {
    const venta = crearVenta(datosVenta)
    dao.guardarVenta(venta);
    return venta
}

export const borrarVentas = () => {
    dao.borrarVentas()
}

export const obtenerVentasSegunUsuario = (idUsuario) => {
    return dao.obtenerVentasSegunUsuario(idUsuario)
}

export const obtenerVentaSegunNombreProducto = (nombreProducto) => {
    const ventasBuscadas = ventas.filter(x => x.productos.filter(x => x.nombreProducto === nombreProducto))
    return copiarVentas(ventasBuscadas)
}

export const obtenerVentasPorId = (idVenta) => {
    return dao.obtenerVentaPorId(idVenta)
}

export const borrarVentaPorId = idVenta => {
    dao.borrarVentaPorId(idVenta);
}

export const reemplazarVenta = (idVenta, datosVenta) => {
    const venta = crearVenta(datosVenta)
    venta.id = idVenta
    dao.guardarVenta(venta);
}