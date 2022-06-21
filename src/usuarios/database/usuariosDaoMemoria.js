import { crearErrorRecursoNoEncontrado } from '../../shared/errors/models/ErrorRecursoNoEncontrado.js'

const usuarios = [];


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

export async function recuperarUsuarios() {
    return copiarUsuarios(usuarios)
}

export async function guadarUsuario(usuario){
    const indiceBuscado = usuarios.findIndex(u => u.id === usuario.id)
    if (indiceBuscado === -1) {
        usuarios.push(usuario)
    } else {
        usuarios[indiceBuscado] = usuario
    }

}

export async function borrarUsuarios(){
    while (usuarios.length > 0) {
        usuarios.pop()
    }
}

export async function obtenerUsuariosSegunId(idUsuario){
    const usuariosBuscados = usuarios.filter(u => u.idUsuario === idUsuario)
    return copiarVentas(usuariosBuscados)
}

export async function obtenerUsuariosPorId(id){

    const usuarioBuscado = usuarios.find(u=> u.id === id);
    
    if(usuarioBuscado !== undefined){
      
        return usuarioBuscado;}
        else {
            throw crearErrorRecursoNoEncontrado('usuario')
        }
}


export async function borrarUsuariosPorId(id){

    const indiceBuscado = usuarios.findIndex(u => u.id === id)
    if (indiceBuscado === -1) {
        throw crearErrorRecursoNoEncontrado('usuario')
    } else {
        usuarios.splice(indiceBuscado, 1)
    }
}


export async function agregarUsuario(usuario){
   
    const usuarioCreado = crearUsuario(usuario);
    
    usuarios.push(usuarioCreado);
    
    return usuarioCreado
}



