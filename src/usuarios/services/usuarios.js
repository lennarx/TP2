import { crearUsuario } from "../models/usuario.js";
import dao from '../database/usuarioDao.js';

export async function obtenerUsuarios(){
    return await dao.recuperarUsuarios();
}

export async function agregarUsuario(datosUsuario){
    const usuario = crearUsuario(datosUsuario);
    await dao.guardarusuarios(usuario)
    return usuario;
}

export async function borrarUsuarios(){
    return await dao.borrarUsuarios()
}

// export async function obtenerUsuariosSegunNombre(nombreUsuario){
   
//     return copiarUsuarios (usuariosBuscados);
// }

export async function obtenerUsuariosPorId(idUsuario){
    return await dao.obtenerUsuariosPorId(idUsuario)
}

export async function borrarUsuariosPorId(idUsuario){
    return await dao.borrarUsuariosPorId(idUsuario)
}

export async function reemplazarUsuarios(id, datosDelUsuario){
    const usuario = crearUsuario(datosDelUsuario)
    usuario.id = id
    await dao.guardarusuarios(usuario)
}