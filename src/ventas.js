const ventas = [
    {
        id: 1,
        idUsuario: 1,
        productos: [
            {
                idProducto: 1,
                nombreProducto : 'Heladera',
                precioProducto : 60000
            },
            {
                idProducto: 2,
                nombreProducto : 'Microondas',
                precioProducto : 80000
            }
        ]
    },
    {   id: 2,
        idUsuario: 2,
        productos: [
            {
                idProducto: 1,
                nombreProducto : 'Heladera',
                precioProducto : 60000
            },
            {
                idProducto: 2,
                nombreProducto : 'Microondas',
                precioProducto : 80000
            }
        ]
    }
]

export function obtenerVentas() {
    return ventas.map(e =>({id: e.id, Iduser: e.idUsuario, productos: e.productos}));
}

export const obtenerVentaPorId = (idVenta) => {
    return ventas.find(v => v.id.toString() === idVenta)
}

export const insertarVenta = (venta) => {
    //futura feature para validar si hay stock de dicho producto
    if(venta != null && venta.id === undefined){
        venta.id = ventas[ventas.length - 1].id + 1
        ventas.push(venta);
        return venta;
    }
    else{
        throw new Error('La venta no es válida')
    }
}