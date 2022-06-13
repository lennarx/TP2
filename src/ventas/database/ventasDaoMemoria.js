const ventas = [];

const copiarVenta = (venta) => {
    return ({ id: venta.id, idUsuario: venta.idUsuario, productos: venta.productos })
}

const copiarVentas = (ventas) => {
    return ventas.map(copiarVenta)
}

export async function recuperarVentas(){
    return copiarVentas(ventas)
}

export async function guardarVenta(venta) {
    const indiceBuscado = ventas.findIndex(v => v.id === venta.id)
    if (indiceBuscado === -1) {
        ventas.push(venta)
    } else {
        ventas[indiceBuscado] = venta
    }
}

export async function borrarVentas(){
    while (ventas.length > 0) {
        ventas.pop()
    }
}

export async function obtenerVentasSegunUsuario(idUsuario) {
    const ventasBuscadas = ventas.filter(x => x.idUsuario === idUsuario)
    return copiarVentas(ventasBuscadas)
}

export async  function obtenerVentaPorId(idVenta){
    const ventaBuscada = ventas.find(v => v.id.toString() === idVenta)
    if (ventaBuscada) {
        return copiarVenta(ventaBuscada)
    } else {
        throw new Error('Venta no encontrada')
    }
}

export async function borrarVentaPorId(idVenta){
    const indiceBuscado = ventas.findIndex(c => c.id === idVenta)
    if (indiceBuscado === -1) {
        throw new Error('Venta no encontrada')
    } else {
        ventas.splice(indiceBuscado, 1)
    }
}
