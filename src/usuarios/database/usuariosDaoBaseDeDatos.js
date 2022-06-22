import {crearErrorRecursoNoEncontrado} from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'
import { crearErrorDePersistencia } from '../../shared/errors/models/ErrorDePersistencia.js';
import { database } from '../../shared/databases/mongoDbClient.js';

const usuarios = database.collection('Usuarios');

export async function guadarUsuario(usuario) {
    try{
        await usuarios.updateOne({ id: usuario.id }, { $set: usuario }, { upsert: true })
    } catch (error){
        throw crearErrorDePersistencia()
    }
     
 
}

export async function obtenerUsuariosPorId(id) {
    let usuarioBuscado 
    try{
        usuarioBuscado = await usuarios.findOne({ id }, { projection: { _id: 0 } })
    } catch(error){
        throw crearErrorDePersistencia()
    }
    if (!usuarioBuscado) {
        throw crearErrorRecursoNoEncontrado('usuario')
    }

    return usuarioBuscado
}

export async function recuperarUsuarios() {
    try{
        const usuariosArray = await usuarios.find().project({ _id: 0 }).toArray();
    return usuariosArray
    } catch(error){
        throw crearErrorDePersistencia()
    }
    
}

export async function borrarUsuariosPorId(id) {
    let result
    try{
        result = await usuarios.deleteOne({ id })
    } catch(error){
        throw crearErrorDePersistencia()
    }
    
    if (result.deletedCount === 0) {
        throw crearErrorRecursoNoEncontrado('usuario')
    }
}

export async function borrarUsuarios() {
    try{
        await usuarios.deleteMany({})
    } catch(error){
        throw crearErrorDePersistencia()
    }
    
}

// export async function nombreEstaDisponible(nombre) {
//     const result = await carreras.findOne({ nombre });
//     return !result
// }
