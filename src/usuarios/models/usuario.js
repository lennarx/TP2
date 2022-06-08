import { obtenerNuevoId } from '../compartidos/ids.js'

export const crearUsuario = (datos) => {
    if (!datos.nombre || !datos.apellido) {
        throw new Error('El usuario debe tener un nombre con apellido')
    }

    const usuario ={
        id : obtenerNuevoId('usuario'),
        nombre : datos.nombre,
        apellido : datos.apellido,
        direccion : datos.direccion,
    }
        
    return usuario;
}
