import { MongoClient } from "mongodb"
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

await client.connect();

const database = client.db('TP2');
const productos = database.collection('Productos');

export async function guardarProducto(producto) {
    const result = await productos.updateOne({ id: producto.id }, { $set: producto }, { upsert: true })
    return
}

export async function obtenerProductoPorId(id) {
    const productoBuscado = await productos.findOne({ id }, { projection: { _id: 0 } })
    if (productoBuscado) {
        return productoBuscado
    } else {
        throw Error('')
    }
}

export async function recuperarProductos() {
    const productosArray = await productos.find().project({ _id: 0 }).toArray();
    return productosArray
}

export async function borrarProductoPorId(id) {
    const result = await productos.deleteOne({ id })
    if (result.deletedCount === 0) {
        throw Error('')
    }
}

export async function borrarProductos() {
    await productos.deleteMany({})
}

// export async function nombreEstaDisponible(nombre) {
//     const result = await carreras.findOne({ nombre });
//     return !result
// }
