import { crearUsuario } from "../models/usuario.js";
import dao from '../database/usuarioDao.js';

export const obtenerUsuarios = () => {
    return dao.recuperarUsuarios();
}

export const agregarUsuario = datosUsuario => {
    const usuario = crearUsuario(datosUsuario);
    dao.guardarusuarios(usuario)
    return usuario;
}

export const borrarUsuarios = () => {
    return dao.borrarUsuarios()
}

export const obtenerUsuariosSegunNombre = (nombreUsuario) => {
    const usuariosBuscados = usuarios.filter(u => u.nombre === nombreUsuario)
    return copiarUsuarios (usuariosBuscados);
}

export const obtenerUsuariosPorId = (idUsuario) => {
    return dao.obtenerUsuariosPorId(idUsuario)
}

export const borrarUsuariosPorId = (idUsuario) => {
    return dao.borrarUsuariosPorId(idUsuario)
}

export const reemplazarUsuarios = (id, datosDelUsuario) => {
    const usuario = crearUsuario(datosDelUsuario)
    usuario.id = id
    dao.guardarusuarios(usuario)
}