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

export const recuperarUsuarios = () => {
    return copiarUsuarios(usuarios)
}

export const guadarUsuario = (usuario) => {
    const indiceBuscado = usuario.findIndex(u => u.id === usuario.id)
    if (indiceBuscado === -1) {
        usuarios.push(usuario)
    } else {
        usuarios[indiceBuscado] = usuario
    }

}

export const borrarUsuarios = () => {
    while (usuarios.length > 0) {
        usuarios.pop()
    }
}

export const obtenerUsuariosSegunId = (idUsuario) => {
    const usuariosBuscados = usuarios.filter(u => u.idUsuario === idUsuario)
    return copiarVentas(usuariosBuscados)
}

export function obtenerUsuariosPorId(id){

    const usuarioBuscado = usuarios.find(u=> u.id === id);
    
    if(usuarioBuscado !== undefined){
      
        return usuarioBuscado;}
        else {
            throw new Error('Usuario no encontrado')
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


export const agregarUsuario = (usuario) => {
   
    const usuarioCreado = crearUsuario(usuario);
    
    usuarios.push(usuarioCreado);
    
    return usuarioCreado
}


