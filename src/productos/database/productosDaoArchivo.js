const productos = [];

const copiarProducto = (producto) => {
    return ({ id: producto.id, nombreProducto: producto.nombreProducto, descripcionProducto: producto.descripcionProducto, precioProducto: producto.precioProducto })
}

const copiarProductos = (productos) => {
    return productos.map(copiarProducto)
}

export function recuperarProductos() {
    return copiarProductos(productos)
}

export function guardarProducto (producto) {
    const indiceBuscado = productos.findIndex(p => p.id === producto.id)
    if (indiceBuscado === -1) {
        productos.push(producto)
    } else {
        productos[indiceBuscado] = producto
    }
}

export function borrarProductos () {
    while (productos.length > 0) {
        productos.pop()
    }
}

export function obtenerProductoPorId (idProducto) {
    const productoBuscada = productos.find(p => p.id.toString() === idProducto)
    if (productoBuscada) {
        return copiarProducto(productoBuscada)
    } else {
        throw new Error('Producto no encontrado')
    }
}

export function borrarProductoPorId (idProducto) {
    const indiceBuscado = productos.findIndex(p => p.id === idProducto)
    if (indiceBuscado === -1) {
        throw new Error('Producto no encontrad0')
    } else {
        productos.splice(indiceBuscado, 1)
    }
}
