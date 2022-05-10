import { crearVenta } from "./Venta.js";

const ventas = []

const copiarVenta = (venta) => {
    return ({ id: venta.id, idUsuario: venta.idUsuario, productos: venta.productos })
}

const copiarVentas = (ventas) => {
    return ventas.map(copiarVenta)
}

export const obtenerVentas = () => {
    return copiarVentas(ventas);
}

export const agregarVenta = datosVenta => {
    const venta = crearVenta(datosVenta)
    ventas.push(venta)
    return venta
}

export const borrarVentas = () => {
    while (ventas.length > 0) {
        ventas.pop()
    }
}

export const obtenerVentasSegunUsuario = (idUsuario) => {
    const ventasBuscadas = ventas.filter(x => x.idUsuario === idUsuario)
    return copiarVentas(ventasBuscadas)
}

export const obtenerVentaSegunNombreProducto = (nombreProducto) => {
    const ventasBuscadas = ventas.filter(x => x.productos.filter(x => x.nombreProducto === nombreProducto))
    return copiarVentas(ventasBuscadas)
}

export const obtenerVentasPorId = (idVenta) => {
    const ventaBuscada = ventas.find(v => v.id.toString() === idVenta)
    if (ventaBuscada) {
        return copiarVenta(ventaBuscada)
    } else {
        throw new Error('Venta no encontrada')
    }
}

export const borrarVentaPorId = idVenta => {
    const indiceBuscado = ventas.findIndex(c => c.id === idVenta)
    if (indiceBuscado === -1) {
        throw new Error('Venta no encontrada')
    } else {
        ventas.splice(indiceBuscado, 1)
    }
}

export const reemplazarVenta = (idVenta, datosVenta) => {
    const indiceBuscado = ventas.findIndex(c => c.id === idVenta)
    if (indiceBuscado === -1) {
        throw new Error('Venta no encontrada')
    } else {
        const venta = crearVenta(datosVenta)
        venta.id = idVenta
        ventas[indiceBuscado] = venta
    }
}