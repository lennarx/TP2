const producto = [
    {
        productos : [
            {
                id: 1,
                nombreProducto : 'Heladera',
                descripcionProducto: 'No Frost - 44 litros',
                precioProducto : 60000
            },
            {
                idProducto: 2,
                nombreProducto : 'Microondas',
                descripcionProducto: 'Microondas - Horno Electrico - Grill - Función descongelar',
                precioProducto : 80000
            },
            {
                idProducto: 3,
                nombreProducto : 'Cocina',
                descripcionProducto: 'Gas Natural - 6 hornallas - Convertible a Gas Envasado',
                precioProducto : 80000
            },
            {
                idProducto: 4,
                nombreProducto : 'TV 60 Pulgadas',
                descripcionProducto: '60 Pulgadas - 3 lineas HDMI - Smart',
                precioProducto : 80000
            }

        ]
    }
]

export const obtenerProductos = () => {
    return producto.map(e =>({productos: e.productos}));
}

export const obtenerProductoPorId = (idProducto) => {
    return producto.find(p => p.id.toString() === idProducto)
}

export const insertarProducto = (producto) => {
    //futura feature para validar si hay stock de dicho producto
    if(producto != null && producto.id === undefined){
        producto.id = producto[producto.length - 1].id + 1
        producto.push(producto);
        return producto;
    }
    else{
        throw new Error('El Producto no es válido')
    }
}

export function borrarProductoSegunId(id) {
    const indiceBuscado = productos.findIndex(c => c.id === id)
    if (indiceBuscado === -1) {
        throw new Error('carrera no encontrada')
    } else {
        prosuctos.splice(indiceBuscado, 1)
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