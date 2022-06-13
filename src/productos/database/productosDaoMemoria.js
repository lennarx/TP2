const productos = [];

const copiarProducto = (producto) => {
    return ({ id: producto.id, nombreProducto: producto.nombreProducto, descripcionProducto: producto.descripcionProducto, precioProducto: producto.precioProducto })
}

const copiarProductos = (productos) => {
    return productos.map(copiarProducto)
}

export const recuperarProductos = () => {
    return copiarProductos(productos)
}

export const guardarProducto = (producto) => {
    const indiceBuscado = productos.findIndex(p => p.id === producto.id)
    if (indiceBuscado === -1) {
        productos.push(producto)
    } else {
        productos[indiceBuscado] = producto
    }
}

export const borrarProductos = () => {
    while (productos.length > 0) {
        productos.pop()
    }
}

export const obtenerProductoPorId = idProducto => {
    const productoBuscado = productos.find(p => p.id.toString() === idProducto)
    if (productoBuscado) {
        return copiarProducto(productoBuscado)
    } else {
        throw new Error('Producto no encontrado')
    }
}

export const borrarProductoPorId = (idProducto) => {
    const indiceBuscado = productos.findIndex(c => c.id === idProducto)
    if (indiceBuscado === -1) {
        throw new Error('Producto no encontrado')
    } else {
        productos.splice(indiceBuscado, 1)
    }
}
