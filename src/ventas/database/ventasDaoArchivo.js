const ventas = [];

const copiarVenta = (venta) => {
    return ({ id: venta.id, idUsuario: venta.idUsuario, productos: venta.productos })
}

const copiarVentas = (ventas) => {
    return ventas.map(copiarVenta)
}

export function recuperarVentas() {
    return copiarVentas(ventas)
}

export function guardarVenta (venta) {
    const indiceBuscado = ventas.findIndex(v => v.id === venta.id)
    if (indiceBuscado === -1) {
        ventas.push(venta)
    } else {
        ventas[indiceBuscado] = venta
    }
}

export function borrarVentas () {
    while (ventas.length > 0) {
        ventas.pop()
    }
}

export function obtenerVentasSegunUsuario (idUsuario) {
    const ventasBuscadas = ventas.filter(x => x.idUsuario === idUsuario)
    return copiarVentas(ventasBuscadas)
}

export function obtenerVentaPorId (idVenta) {
    const ventaBuscada = ventas.find(v => v.id.toString() === idVenta)
    if (ventaBuscada) {
        return copiarVenta(ventaBuscada)
    } else {
        throw new Error('Venta no encontrada')
    }
}

export function borrarVentaPorId (idVenta) {
    const indiceBuscado = ventas.findIndex(c => c.id === idVenta)
    if (indiceBuscado === -1) {
        throw new Error('Venta no encontrada')
    } else {
        ventas.splice(indiceBuscado, 1)
    }
}
