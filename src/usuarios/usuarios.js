import { crearUsuario } from "./usuario.js";

const usuarios = [];

export const agregarUsuario = (usuario) => {
   
    const usuarioCreado = crearUsuario(usuario);
    
    usuarios.push(usuarioCreado);
    
    return usuarioCreado
}


export const borrarUsuarios = () => {

    while (usuarios.length > 0) {
        usuarios.pop()
    }
}

export const borrarUsuariosPorId = (id) => {

    const indiceBuscado = usuarios.findIndex(u => u.id === id)
    if (indiceBuscado === -1) {
        throw new Error('Venta no encontrada')
    } else {
        usuarios.splice(indiceBuscado, 1)
    }
}

const copiarUsuario = (usuario) => {
    return ({ 
        id: usuario.id,
        nombre: usuario.nombre, 
        apellido: usuario.apellido,
        direccion: usuario.direccion})
}

const copiarUsuarios = (usuarios) => {
    return usuarios.map(copiarUsuario)
}

export const obtenerUsuarios = () => {
    return copiarUsuarios(usuarios);
}

export function obtenerUsuariosPorId(id){

    const usuarioBuscado = usuarios.find(u=> u.id === id);
    
    if(usuarioBuscado !== undefined){
      
        return usuarioBuscado;}
        else {
            throw new Error('Usuario no encontrado')
        }
    }

export const reemplazarUsuarios = (id, datosDelUsuario) => {
    const indiceBuscado = usuarios.findIndex(u => u.id === id)
    if (indiceBuscado === -1) {
        throw new Error('usuario no encontrado')
    } else {
        const usuario = crearUsuario(datosDelUsuario)
        usuario.id = id
        usuarios[indiceBuscado] = usuario
    }
}

