import { MongoClient } from "mongodb"
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

await client.connect();

const database = client.db('TP2');
const usuarios = database.collection('Usuarios');

export async function guadarUsuario(usuario) {
    const result = await usuarios.updateOne({ id: usuario.id }, { $set: usuario }, { upsert: true })
    return
}

export async function obtenerUsuariosPorId(id) {
    const usuarioBuscado = await usuarios.findOne({ id }, { projection: { _id: 0 } })
    if (usuarioBuscado) {
        return usuarioBuscado
    } else {
        throw Error('')
    }
}

export async function recuperarUsuarios() {
    const usuariosArray = await usuarios.find().project({ _id: 0 }).toArray();
    return usuariosArray
}

export async function borrarUsuariosPorId(id) {
    const result = await usuarios.deleteOne({ id })
    if (result.deletedCount === 0) {
        throw Error('')
    }
}

export async function borrarUsuarios() {
    await usuarios.deleteMany({})
}

// export async function nombreEstaDisponible(nombre) {
//     const result = await carreras.findOne({ nombre });
//     return !result
// }
