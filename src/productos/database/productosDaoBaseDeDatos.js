import {crearErrorRecursoNoEncontrado} from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'
import { crearErrorDePersistencia } from '../../shared/errors/models/ErrorDePersistencia.js';
import { database } from '../../shared/databases/mongoDbClient.js';

const productos = database.collection('Productos');

export async function guardarProducto(producto) {
    try{
        await productos.updateOne({ id: producto.id }, { $set: producto }, { upsert: true })
    } catch(error){
        throw crearErrorDePersistencia()
    }
    
}

export async function obtenerProductoPorId(id) {
    let productoBuscado 
    try{
        productoBuscado = await productos.findOne({ id }, { projection: { _id: 0 } })
    } catch(error){
        throw crearErrorDePersistencia()
    }
    if (!productoBuscado) {
        throw crearErrorRecursoNoEncontrado('venta')
    } 
    return productoBuscado
 }


export async function recuperarProductos() {
    try{
        const productosArray = await productos.find().project({ _id: 0 }).toArray();
        return productosArray
    } catch (error){
        throw crearErrorDePersistencia()
    }
    
}

export async function borrarProductoPorId(id) {
    let result 
    try{
        result = await productos.deleteOne({ id })
    } catch(error) {
        throw crearErrorDePersistencia()
    }
    if (result.deletedCount === 0) {
        throw crearErrorRecursoNoEncontrado('producto')
    }
}

export async function borrarProductos() {
    try{
       await productos.deleteMany({}) 
    } catch(error){
        throw crearErrorDePersistencia()
    }
    
}

// export async function nombreEstaDisponible(nombre) {
//     const result = await carreras.findOne({ nombre });
//     return !result
// }
