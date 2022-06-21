import {crearErrorRecursoNoEncontrado} from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'
import { crearErrorDePersistencia } from '../../shared/errors/models/ErrorDePersistencia.js';
import { database } from '../../shared/databases/mongoDbClient.js';

const ventas = database.collection('Ventas');

export async function guardarVenta(venta) {
    try{
        await ventas.updateOne({ id: venta.id }, { $set: venta }, { upsert: true })
    } catch(error){
        throw crearErrorDePersistencia()
    }
   
}

export async function obtenerVentaPorId(id) {
    let ventaBuscada 
    try {
        ventaBuscada = await ventas.findOne({ id }, { projection: { _id: 0 } })
    } catch(error) {
        throw crearErrorDePersistencia()
    }

    if(!ventaBuscada){
        throw crearErrorRecursoNoEncontrado('venta')
    }

    return ventaBuscada
}

export async function recuperarVentas() {
    try{
        const ventasArray = await ventas.find().project({ _id: 0 }).toArray();
        return ventasArray
    } catch (error) {
        throw crearErrorDePersistencia()
    }
    
    
}

export async function obtenerVentasSegunUsuario(idUsuario) {
    try{
        return await ventas.find({ usuario: { $all: [idUsuario] } }).project({ _id: 0 }).toArray()
    } catch(error) {
        throw crearErrorDePersistencia()
    }
    
}

export async function borrarVentaPorId(id) {
    let result 
    try{
      result = await ventas.deleteOne({ id })  
    } catch(error) {
        throw crearErrorDePersistencia()
    }
    if (result.deletedCount === 0) {
        throw crearErrorRecursoNoEncontrado('venta')
    }
}

export async function borrarVentas() {
    try {
        await ventas.deleteMany({})
} catch (error) {
    throw crearErrorDePersistencia()
}
}

// export async function nombreEstaDisponible(nombre) {
//     const result = await carreras.findOne({ nombre });
//     return !result
// }
