import { obtenerNuevoId } from '../compartidos/ids.js'

export const crearUsuario = (datos) => {
    if (datos == null) {
        throw new Error('El usuario no puede ser nulo')
    }

    const usuario ={
        id : obtenerNuevoId('usuario'),
        nombre : datos.nombre,
        apellido : datos.apellido,
        direccion : datos.direccion,
    }
        
    return usuario;
}
